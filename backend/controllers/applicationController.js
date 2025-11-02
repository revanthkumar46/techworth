const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

exports.submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        fs.unlink(file.path, () => {});
      });
    }
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    jobId,
    fullName,
    mobile,
    email,
    collegeName,
    location,
    graduationYear,
    cgpa,
    gender,
    coverLetter,
    experience,
    skills,
    technologies
  } = req.body;

  const resumeFile = req.files?.resume?.[0];
  const coverLetterFile = req.files?.coverLetter?.[0];

  if (!resumeFile) {
    return res.status(400).json({ message: 'Resume is required' });
  }

  try {
    const resumePath = path.relative(process.cwd(), resumeFile.path).replace(/\\/g, '/');
    const coverLetterPath = coverLetterFile ? path.relative(process.cwd(), coverLetterFile.path).replace(/\\/g, '/') : null;

    await pool.execute(
      `INSERT INTO job_applications (
        job_id, full_name, mobile, email, college_name, location,
        graduation_year, cgpa, gender, resume_path, cover_letter_path,
        cover_letter_text, experience_text, skills, technologies
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        jobId || null,
        fullName,
        mobile || null,
        email,
        collegeName,
        location,
        graduationYear,
        cgpa,
        gender,
        resumePath,
        coverLetterPath,
        coverLetter || null,
        experience || null,
        skills,
        technologies
      ]
    );

    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    console.error(err);
    if (resumeFile) fs.unlink(resumeFile.path, () => {});
    if (coverLetterFile) fs.unlink(coverLetterFile.path, () => {});
    res.status(500).json({ message: 'Failed to submit application' });
  }
};


