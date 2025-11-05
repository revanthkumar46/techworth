const { validationResult } = require('express-validator');
const pool = require('../config/db');

const parseRequirements = (value) => {
  if (!value) return [];
  if (typeof value === 'string') {
    // Split by bullet points or newlines
    return value
      .split(/[•\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
  return [];
};

const mapJobRow = (row) => {
  const requirements = parseRequirements(row.requirements);
  return {
    id: row.id,
    title: row.title,
    category: row.category || '',
    location: row.location || '',
    type: row.job_type || 'full_time',
    experience: '', // Not in jobs table, will be empty
    description: row.description || '',
    requirements: requirements,
    skills: [], // Not in jobs table structure
    technologies: [], // Not in jobs table structure
    salaryRange: row.salary_range || '',
    status: row.status || 'active',
    applicationDeadline: row.application_deadline || null,
    createdAt: row.created_at
  };
};

exports.getJobs = async (req, res) => {
  try {
    // Get only active jobs for public display
    const [rows] = await pool.query(
      'SELECT * FROM jobs WHERE status = ? ORDER BY created_at DESC',
      ['active']
    );
    res.json(rows.map(mapJobRow));
  } catch (err) {
    console.error('Job fetch error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM jobs WHERE id = ? AND status = ?',
      [req.params.id, 'active']
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.json(mapJobRow(rows[0]));
  } catch (err) {
    console.error('Job fetch error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

exports.createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, category, location, type, experience, description, requirements, skills, technologies, salaryRange, status, applicationDeadline } = req.body;

  try {
    const requirementsText = Array.isArray(requirements)
      ? requirements.map(r => `• ${r}`).join('\n')
      : (requirements || '');

    const [result] = await pool.execute(
      `INSERT INTO jobs (title, category, location, job_type, description, requirements, salary_range, status, application_deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category || '',
        location || '',
        type || 'full_time',
        description || '',
        requirementsText,
        salaryRange || null,
        status || 'draft',
        applicationDeadline || null
      ]
    );

    res.status(201).json({ id: result.insertId, message: 'Job created successfully' });
  } catch (err) {
    console.error('Job create error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

exports.updateJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, category, location, type, experience, description, requirements, skills, technologies, salaryRange, status, applicationDeadline } = req.body;

  try {
    const requirementsText = Array.isArray(requirements)
      ? requirements.map(r => `• ${r}`).join('\n')
      : (requirements || '');

    const [result] = await pool.execute(
      `UPDATE jobs SET title=?, category=?, location=?, job_type=?, description=?, requirements=?, salary_range=?, status=?, application_deadline=? WHERE id=?`,
      [
        title,
        category || '',
        location || '',
        type || 'full_time',
        description || '',
        requirementsText,
        salaryRange || null,
        status || 'draft',
        applicationDeadline || null,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    console.error('Job update error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Job delete error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};
