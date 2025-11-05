const pool = require('../config/db');
const { validationResult } = require('express-validator');

// Public newsletter subscription
exports.subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check if email already exists - handle missing is_active column gracefully
    let existing;
    try {
      const [result] = await pool.query(
        'SELECT id, is_active FROM newsletter_subscribers WHERE email = ?',
        [email]
      );
      existing = result;
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' && err.message.includes('is_active')) {
        // is_active column doesn't exist, just check by email
        const [result] = await pool.query(
          'SELECT id FROM newsletter_subscribers WHERE email = ?',
          [email]
        );
        existing = result;
        // If email exists but no is_active column, treat as already subscribed
        if (existing.length > 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'This email is already subscribed' 
          });
        }
      } else {
        throw err;
      }
    }

    if (existing && existing.length > 0) {
      // Check if is_active exists in the result
      if (existing[0].hasOwnProperty('is_active')) {
        if (existing[0].is_active) {
          return res.status(400).json({ 
            success: false, 
            message: 'This email is already subscribed' 
          });
        } else {
          // Reactivate the subscription
          try {
            await pool.execute(
              'UPDATE newsletter_subscribers SET is_active = 1, unsubscribed_at = NULL WHERE id = ?',
              [existing[0].id]
            );
            return res.json({ 
              success: true, 
              message: 'Subscription reactivated successfully' 
            });
          } catch (updateErr) {
            // If is_active column doesn't exist, just return success
            if (updateErr.code === 'ER_BAD_FIELD_ERROR') {
              return res.json({ 
                success: true, 
                message: 'You are already subscribed!' 
              });
            }
            throw updateErr;
          }
        }
      } else {
        // Email exists but no is_active column
        return res.status(400).json({ 
          success: false, 
          message: 'This email is already subscribed' 
        });
      }
    }

    // Insert new subscription
    try {
      await pool.execute(
        'INSERT INTO newsletter_subscribers (email, is_active) VALUES (?, 1)',
        [email]
      );
    } catch (insertErr) {
      // If is_active column doesn't exist, insert without it
      if (insertErr.code === 'ER_BAD_FIELD_ERROR') {
        await pool.execute(
          'INSERT INTO newsletter_subscribers (email) VALUES (?)',
          [email]
        );
      } else {
        throw insertErr;
      }
    }

    res.json({ success: true, message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        success: false, 
        message: 'This email is already subscribed' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const isActive = req.query.is_active;
    const search = req.query.search;

    let query = 'SELECT * FROM newsletter_subscribers WHERE 1=1';
    const conditions = [];
    const params = [];

    if (isActive !== undefined) {
      conditions.push('is_active = ?');
      params.push(isActive === 'true' ? 1 : 0);
    }

    if (search) {
      conditions.push('email LIKE ?');
      params.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    query += ` ORDER BY subscribed_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [subscribers] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM newsletter_subscribers WHERE 1=1';
    if (conditions.length > 0) {
      countQuery += ' AND ' + conditions.join(' AND ');
    }
    const [countResult] = await pool.query(countQuery, params);
    const total = countResult[0].total;

    res.json({
      success: true,
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM newsletter_subscribers WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete subscriber' });
  }
};

exports.toggleSubscriberStatus = async (req, res) => {
  try {
    const [subscriber] = await pool.query('SELECT is_active FROM newsletter_subscribers WHERE id = ?', [req.params.id]);

    if (subscriber.length === 0) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    const newStatus = !subscriber[0].is_active;
    const [result] = await pool.execute(
      'UPDATE newsletter_subscribers SET is_active = ?, unsubscribed_at = ? WHERE id = ?',
      [newStatus ? 1 : 0, newStatus ? null : new Date(), req.params.id]
    );

    res.json({ success: true, message: `Subscriber ${newStatus ? 'activated' : 'deactivated'} successfully` });
  } catch (error) {
    console.error('Toggle subscriber status error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle subscriber status' });
  }
};

exports.exportSubscribers = async (req, res) => {
  try {
    const [subscribers] = await pool.query('SELECT email, subscribed_at, is_active FROM newsletter_subscribers ORDER BY subscribed_at DESC');

    // Convert to CSV
    const csv = [
      ['Email', 'Subscribed At', 'Status'].join(','),
      ...subscribers.map(s => [
        s.email,
        s.subscribed_at.toISOString(),
        s.is_active ? 'Active' : 'Inactive'
      ].join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=newsletter_subscribers.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({ success: false, message: 'Failed to export subscribers' });
  }
};
