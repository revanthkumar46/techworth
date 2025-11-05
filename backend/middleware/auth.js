const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const [users] = await pool.query(
      'SELECT id, username, email, role, is_active FROM admin_users WHERE id = ?',
      [decoded.id]
    );

    if (users.length === 0 || !users[0].is_active) {
      return res.status(401).json({ success: false, message: 'Invalid or inactive user' });
    }

    req.admin = users[0];
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    next();
  };
};

const logActivity = async (req, res, next) => {
  const originalSend = res.json;
  res.json = async function (data) {
    if (req.admin && req.method !== 'GET') {
      try {
        await pool.query(
          `INSERT INTO admin_activity_logs (admin_id, action, resource_type, resource_id, details, ip_address)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            req.admin.id,
            `${req.method} ${req.path}`,
            req.path.split('/')[3] || 'unknown',
            req.params.id || null,
            JSON.stringify({ body: req.body, query: req.query }),
            req.ip || req.connection.remoteAddress
          ]
        );
      } catch (err) {
        console.error('Activity log error:', err);
      }
    }
    originalSend.call(this, data);
  };
  next();
};

module.exports = { authenticate, authorize, logActivity };

