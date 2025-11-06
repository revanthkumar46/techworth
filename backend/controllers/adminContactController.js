const pool = require('../config/db');

exports.getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (search) {
      conditions.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [contacts] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contact_messages WHERE 1=1';
    if (conditions.length > 0) {
      countQuery += ' AND ' + conditions.join(' AND ');
    }
    const [countResult] = await pool.query(countQuery, params);
    const total = countResult[0].total;

    res.json({
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const [contacts] = await pool.query('SELECT * FROM contact_messages WHERE id = ?', [req.params.id]);

    if (contacts.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Update status to 'read' if it's 'new'
    if (contacts[0].status === 'new') {
      await pool.query('UPDATE contact_messages SET status = ? WHERE id = ?', ['read', req.params.id]);
      contacts[0].status = 'read';
    }

    res.json({ success: true, contact: contacts[0] });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact' });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const [result] = await pool.execute(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact status updated successfully' });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update contact status' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contact' });
  }
};

exports.markAsReplied = async (req, res) => {
  try {
    const [result] = await pool.execute(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      ['replied', req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact marked as replied' });
  } catch (error) {
    console.error('Mark as replied error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark as replied' });
  }
};


