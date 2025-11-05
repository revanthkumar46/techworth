const pool = require('../config/db');

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

