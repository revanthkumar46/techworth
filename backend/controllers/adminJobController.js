const pool = require('../config/db');

const parseRequirements = (value) => {
  if (!value) return [];
  if (typeof value === 'string') {
    return value
      .split(/[•\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
  return Array.isArray(value) ? value : [];
};

exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    let query = 'SELECT j.*, COUNT(ja.id) as application_count FROM jobs j LEFT JOIN job_applications ja ON j.id = ja.job_id';
    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('j.status = ?');
      params.push(status);
    }

    if (search) {
      conditions.push('(j.title LIKE ? OR j.description LIKE ? OR j.location LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ` GROUP BY j.id ORDER BY j.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [jobs] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(DISTINCT j.id) as total FROM jobs j';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const [countResult] = await pool.query(countQuery, params.slice(0, -2));
    const total = countResult[0].total;

    res.json({
      success: true,
      jobs: jobs.map(job => ({
        ...job,
        requirements: parseRequirements(job.requirements),
        application_count: parseInt(job.application_count) || 0
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);

    if (jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const job = jobs[0];
    job.requirements = parseRequirements(job.requirements);

    res.json({ success: true, job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch job' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, description, requirements, location, job_type, salary_range, category, status, application_deadline } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const requirementsText = Array.isArray(requirements)
      ? requirements.map(r => `• ${r}`).join('\n')
      : (requirements || '');

    const [result] = await pool.execute(
      `INSERT INTO jobs (title, description, requirements, location, job_type, salary_range, category, status, application_deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        requirementsText,
        location || null,
        job_type || 'full_time',
        salary_range || null,
        category || null,
        status || 'draft',
        application_deadline || null
      ]
    );

    res.status(201).json({ success: true, message: 'Job created successfully', id: result.insertId });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ success: false, message: 'Failed to create job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { title, description, requirements, location, job_type, salary_range, category, status, application_deadline } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const requirementsText = Array.isArray(requirements)
      ? requirements.map(r => `• ${r}`).join('\n')
      : (requirements || '');

    const [result] = await pool.execute(
      `UPDATE jobs SET title=?, description=?, requirements=?, location=?, job_type=?, salary_range=?, category=?, status=?, application_deadline=?
       WHERE id=?`,
      [
        title,
        description,
        requirementsText,
        location || null,
        job_type || 'full_time',
        salary_range || null,
        category || null,
        status || 'draft',
        application_deadline || null,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job updated successfully' });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ success: false, message: 'Failed to update job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete job' });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const [applications] = await pool.query(
      `SELECT ja.*, j.title as job_title FROM job_applications ja
       LEFT JOIN jobs j ON ja.job_id = j.id
       WHERE ja.job_id = ?
       ORDER BY ja.created_at DESC`,
      [req.params.id]
    );

    res.json({ success: true, applications });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
};
