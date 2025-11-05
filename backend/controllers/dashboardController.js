const pool = require('../config/db');

// Helper function to safely query a table and return default values if it doesn't exist
async function safeQuery(query, params, defaultValues) {
  try {
    if (!pool) {
      console.error('Database pool is not initialized');
      return defaultValues;
    }
    const [results] = await pool.query(query, params);
    return results[0] || defaultValues;
  } catch (error) {
    // Log full error details for debugging
    console.error('Query error details:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message,
      sql: error.sql ? error.sql.substring(0, 100) : 'N/A'
    });
    
    // If table doesn't exist or column doesn't exist, return default values
    if (error.code === 'ER_NO_SUCH_TABLE' || 
        error.code === '42S02' || 
        error.code === 'ER_BAD_FIELD_ERROR' ||
        error.code === '42S22' ||
        error.code === 'ER_NO_SUCH_COLUMN') {
      console.warn(`Table/Column not found, using defaults:`, error.message);
      return defaultValues;
    }
    // For connection errors, still return defaults but log them
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.error('Database connection error:', error.message);
      return defaultValues;
    }
    // Log other errors but still return defaults to prevent full failure
    console.error('Query error:', error.message);
    return defaultValues;
  }
}

exports.getStats = async (req, res) => {
  try {
    // Test database connection first
    try {
      await pool.query('SELECT 1');
    } catch (connError) {
      console.error('Database connection error:', connError);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection failed',
        error: process.env.NODE_ENV === 'development' ? connError.message : undefined
      });
    }

    // Get contact messages stats - handle missing table/columns gracefully
    // Check if status column exists first, if not, just count total
    let contactStats;
    try {
      // Try query with status column
      const [result] = await pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
          SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_count,
          SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_count
        FROM contact_messages
      `);
      contactStats = result[0] || { total: 0, new_count: 0, read_count: 0, replied_count: 0 };
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        // Status column doesn't exist, just get total count
        const [result] = await pool.query(`SELECT COUNT(*) as total FROM contact_messages`);
        contactStats = { total: result[0]?.total || 0, new_count: 0, read_count: 0, replied_count: 0 };
      } else {
        contactStats = { total: 0, new_count: 0, read_count: 0, replied_count: 0 };
      }
    }

    // Get job applications stats - handle missing table/columns gracefully
    let applicationStats;
    try {
      const [result] = await pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
          SUM(CASE WHEN status = 'reviewed' THEN 1 ELSE 0 END) as reviewed_count,
          SUM(CASE WHEN status = 'shortlisted' THEN 1 ELSE 0 END) as shortlisted_count,
          SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_count
        FROM job_applications
      `);
      applicationStats = result[0] || { total: 0, pending_count: 0, reviewed_count: 0, shortlisted_count: 0, rejected_count: 0 };
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        const [result] = await pool.query(`SELECT COUNT(*) as total FROM job_applications`);
        applicationStats = { total: result[0]?.total || 0, pending_count: 0, reviewed_count: 0, shortlisted_count: 0, rejected_count: 0 };
      } else {
        applicationStats = { total: 0, pending_count: 0, reviewed_count: 0, shortlisted_count: 0, rejected_count: 0 };
      }
    }

    // Get jobs stats - handle missing table/columns gracefully
    let jobStats;
    try {
      const [result] = await pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count,
          SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_count,
          SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed_count
        FROM jobs
      `);
      jobStats = result[0] || { total: 0, active_count: 0, draft_count: 0, closed_count: 0 };
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        const [result] = await pool.query(`SELECT COUNT(*) as total FROM jobs`);
        jobStats = { total: result[0]?.total || 0, active_count: 0, draft_count: 0, closed_count: 0 };
      } else {
        jobStats = { total: 0, active_count: 0, draft_count: 0, closed_count: 0 };
      }
    }

    // Get newsletter subscribers count - handle missing table/columns gracefully
    let newsletterStats;
    try {
      const [result] = await pool.query(`SELECT COUNT(*) as total FROM newsletter_subscribers WHERE is_active = 1`);
      newsletterStats = result[0] || { total: 0 };
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        // is_active column doesn't exist, count all subscribers
        const [result] = await pool.query(`SELECT COUNT(*) as total FROM newsletter_subscribers`);
        newsletterStats = { total: result[0]?.total || 0 };
      } else {
        newsletterStats = { total: 0 };
      }
    }

    res.json({
      success: true,
      stats: {
        contacts: contactStats,
        applications: applicationStats,
        jobs: jobStats,
        newsletter: newsletterStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper function to safely query recent items and return empty array if table doesn't exist
async function safeQueryArray(query, params) {
  try {
    if (!pool) {
      console.error('Database pool is not initialized');
      return [];
    }
    const [results] = await pool.query(query, params);
    return results || [];
  } catch (error) {
    // Log full error details for debugging
    console.error('Query error details:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message,
      sql: error.sql ? error.sql.substring(0, 100) : 'N/A'
    });
    
    // If table doesn't exist or column doesn't exist, return empty array
    if (error.code === 'ER_NO_SUCH_TABLE' || 
        error.code === '42S02' || 
        error.code === 'ER_BAD_FIELD_ERROR' ||
        error.code === '42S22' ||
        error.code === 'ER_NO_SUCH_COLUMN') {
      console.warn(`Table/Column not found, returning empty array:`, error.message);
      return [];
    }
    // For connection errors, still return empty array but log them
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      console.error('Database connection error:', error.message);
      return [];
    }
    // Log other errors but still return empty array to prevent full failure
    console.error('Query error:', error.message);
    return [];
  }
}

exports.getRecentActivity = async (req, res) => {
  try {
    // Validate and sanitize limit parameter (MySQL LIMIT doesn't always support placeholders)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100); // Between 1 and 100
    const safeLimit = parseInt(limit); // Ensure it's a valid integer

    // Get recent contacts - handle missing table/columns gracefully
    let recentContacts;
    try {
      const [results] = await pool.query(
        `SELECT id, name, email, subject, status, created_at 
         FROM contact_messages 
         ORDER BY created_at DESC 
         LIMIT ${safeLimit}`
      );
      recentContacts = results || [];
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        // Status column doesn't exist, exclude it
        const [results] = await pool.query(
          `SELECT id, name, email, subject, created_at 
           FROM contact_messages 
           ORDER BY created_at DESC 
           LIMIT ${safeLimit}`
        );
        recentContacts = results || [];
      } else {
        recentContacts = [];
      }
    }

    // Get recent applications - handle missing table/columns gracefully
    let recentApplications;
    try {
      const [results] = await pool.query(
        `SELECT a.id, a.full_name, a.email, a.status, j.title as job_title, a.created_at
         FROM job_applications a
         LEFT JOIN jobs j ON a.job_id = j.id
         ORDER BY a.created_at DESC
         LIMIT ${safeLimit}`
      );
      recentApplications = results || [];
    } catch (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === '42S22') {
        // Status column doesn't exist, exclude it
        const [results] = await pool.query(
          `SELECT a.id, a.full_name, a.email, j.title as job_title, a.created_at
           FROM job_applications a
           LEFT JOIN jobs j ON a.job_id = j.id
           ORDER BY a.created_at DESC
           LIMIT ${safeLimit}`
        );
        recentApplications = results || [];
      } else {
        recentApplications = [];
      }
    }

    // Get recent activity logs - handle missing table gracefully
    const recentLogs = await safeQueryArray(
      `SELECT l.*, u.username 
       FROM admin_activity_logs l
       LEFT JOIN admin_users u ON l.admin_id = u.id
       ORDER BY l.created_at DESC
       LIMIT ${safeLimit}`,
      []
    );

    res.json({
      success: true,
      activities: {
        contacts: recentContacts,
        applications: recentApplications,
        logs: recentLogs
      }
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recent activity',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

