const pool = require('../config/db');

exports.getEmailTemplates = async (req, res) => {
  try {
    const [templates] = await pool.query('SELECT * FROM email_templates ORDER BY name ASC');
    res.json({ success: true, templates });
  } catch (error) {
    console.error('Get email templates error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch email templates' });
  }
};

exports.getEmailTemplateById = async (req, res) => {
  try {
    const [templates] = await pool.query('SELECT * FROM email_templates WHERE id = ?', [req.params.id]);

    if (templates.length === 0) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({ success: true, template: templates[0] });
  } catch (error) {
    console.error('Get email template error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch email template' });
  }
};

exports.updateEmailTemplate = async (req, res) => {
  try {
    const { subject, body, variables } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ success: false, message: 'Subject and body are required' });
    }

    const [result] = await pool.execute(
      'UPDATE email_templates SET subject = ?, body = ?, variables = ? WHERE id = ?',
      [subject, body, JSON.stringify(variables || {}), req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({ success: true, message: 'Email template updated successfully' });
  } catch (error) {
    console.error('Update email template error:', error);
    res.status(500).json({ success: false, message: 'Failed to update email template' });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const [logs] = await pool.query(`
      SELECT l.*, u.username 
      FROM admin_activity_logs l
      LEFT JOIN admin_users u ON l.admin_id = u.id
      ORDER BY l.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);

    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM admin_activity_logs');
    const total = countResult[0].total;

    res.json({
      success: true,
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs' });
  }
};

