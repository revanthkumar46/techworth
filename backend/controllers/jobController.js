const { validationResult } = require('express-validator');
const pool = require('../config/db');

const parseJSONColumn = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (err) {
      return [];
    }
  }
  return [];
};

const mapJobRow = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  location: row.location,
  type: row.job_type,
  experience: row.experience,
  description: row.description,
  requirements: parseJSONColumn(row.requirements),
  skills: parseJSONColumn(row.skills),
  technologies: parseJSONColumn(row.technologies),
  createdAt: row.created_at
});

exports.getJobs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM job_openings ORDER BY created_at DESC');
    res.json(rows.map(mapJobRow));
  } catch (err) {
    console.error('Job fetch error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM job_openings WHERE id = ?', [req.params.id]);
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

  const { title, category, location, type, experience, description, requirements, skills, technologies } = req.body;

  try {
    const [result] = await pool.execute(
      `INSERT INTO job_openings (title, category, location, job_type, experience, description, requirements, skills, technologies)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        title,
        category,
        location,
        type,
        experience,
        description,
        JSON.stringify(requirements || []),
        JSON.stringify(skills || []),
        JSON.stringify(technologies || [])
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Job create error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

exports.updateJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, category, location, type, experience, description, requirements, skills, technologies } = req.body;

  try {
    const [result] = await pool.execute(
      `UPDATE job_openings SET title=?, category=?, location=?, job_type=?, experience=?, description=?, requirements=?, skills=?, technologies=? WHERE id=?`,
      [
        title,
        category,
        location,
        type,
        experience,
        description,
        JSON.stringify(requirements || []),
        JSON.stringify(skills || []),
        JSON.stringify(technologies || []),
        req.params.id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job updated' });
  } catch (err) {
    console.error('Job update error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM job_openings WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error('Job delete error:', err.message, err.stack);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};
