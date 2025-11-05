const pool = require('../config/db');
const path = require('path');
const fs = require('fs').promises;

exports.getApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const jobId = req.query.job_id;
    const search = req.query.search;

    let query = `
      SELECT a.*, j.title as job_title, j.location as job_location
      FROM job_applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      WHERE 1=1
    `;
    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('a.status = ?');
      params.push(status);
    }

    if (jobId) {
      conditions.push('a.job_id = ?');
      params.push(jobId);
    }

    if (search) {
      conditions.push('(a.full_name LIKE ? OR a.email LIKE ? OR j.title LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    query += ` ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [applications] = await pool.query(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM job_applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      WHERE 1=1
    `;
    if (conditions.length > 0) {
      countQuery += ' AND ' + conditions.join(' AND ');
    }
    const [countResult] = await pool.query(countQuery, params);
    const total = countResult[0].total;

    res.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT a.*, j.title as job_title, j.location as job_location, j.description as job_description
      FROM job_applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      WHERE a.id = ?
    `, [req.params.id]);

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, application: applications[0] });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch application' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, admin_notes } = req.body;

    if (!['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Check if admin_notes column exists, if not update without it
    try {
      // Try to update with admin_notes
      const [result] = await pool.execute(
        'UPDATE job_applications SET status = ?, admin_notes = ? WHERE id = ?',
        [status, admin_notes || null, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }

      res.json({ success: true, message: 'Application status updated successfully' });
    } catch (err) {
      // If admin_notes column doesn't exist, update without it
      if (err.code === 'ER_BAD_FIELD_ERROR' && err.message.includes('admin_notes')) {
        console.warn('admin_notes column not found, updating status only. Please run migration.');
        const [result] = await pool.execute(
          'UPDATE job_applications SET status = ? WHERE id = ?',
          [status, req.params.id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.json({ 
          success: true, 
          message: 'Application status updated successfully (admin_notes column not available)' 
        });
      } else {
        throw err;
      }
    }
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update application status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    // Get application to delete resume file if exists
    const [applications] = await pool.query('SELECT resume_path FROM job_applications WHERE id = ?', [req.params.id]);

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Delete resume file if exists
    if (applications[0].resume_path) {
      try {
        const filePath = path.join(__dirname, '..', applications[0].resume_path);
        await fs.unlink(filePath);
      } catch (err) {
        console.error('Error deleting resume file:', err);
      }
    }

    const [result] = await pool.execute('DELETE FROM job_applications WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete application' });
  }
};

exports.downloadResume = async (req, res) => {
  try {
    const [applications] = await pool.query('SELECT resume_path, full_name FROM job_applications WHERE id = ?', [req.params.id]);

    if (applications.length === 0 || !applications[0].resume_path) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const filePath = path.join(__dirname, '..', applications[0].resume_path);
    const fileName = `${applications[0].full_name.replace(/\s+/g, '_')}_resume${path.extname(applications[0].resume_path)}`;

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ success: false, message: 'Failed to download resume' });
      }
    });
  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({ success: false, message: 'Failed to download resume' });
  }
};

// Preview resume (for embedding in iframe/viewer)
exports.previewResume = async (req, res) => {
  try {
    const [applications] = await pool.query('SELECT resume_path, full_name FROM job_applications WHERE id = ?', [req.params.id]);

    if (applications.length === 0 || !applications[0].resume_path) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const filePath = path.join(__dirname, '..', applications[0].resume_path);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ success: false, message: 'Resume file not found' });
    }

    const ext = path.extname(applications[0].resume_path).toLowerCase();
    
    // Set appropriate headers for preview
    if (ext === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');
    } else if (['.doc', '.docx'].includes(ext)) {
      // For Word documents, we'll need to download them
      res.setHeader('Content-Type', 'application/msword');
      res.setHeader('Content-Disposition', `attachment; filename="${applications[0].full_name.replace(/\s+/g, '_')}_resume${ext}"`);
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'inline');
    }

    // Send file
    res.sendFile(path.resolve(filePath));
  } catch (error) {
    console.error('Preview resume error:', error);
    res.status(500).json({ success: false, message: 'Failed to preview resume' });
  }
};

// Download cover letter file
exports.downloadCoverLetter = async (req, res) => {
  try {
    const [applications] = await pool.query('SELECT cover_letter_path, full_name FROM job_applications WHERE id = ?', [req.params.id]);

    if (applications.length === 0 || !applications[0].cover_letter_path) {
      return res.status(404).json({ success: false, message: 'Cover letter file not found' });
    }

    const filePath = path.join(__dirname, '..', applications[0].cover_letter_path);
    const ext = path.extname(applications[0].cover_letter_path);
    const fileName = `${applications[0].full_name.replace(/\s+/g, '_')}_cover_letter${ext}`;

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({ success: false, message: 'Failed to download cover letter' });
      }
    });
  } catch (error) {
    console.error('Download cover letter error:', error);
    res.status(500).json({ success: false, message: 'Failed to download cover letter' });
  }
};

// Get application analysis/stats
exports.getApplicationAnalysis = async (req, res) => {
  try {
    const [applications] = await pool.query('SELECT * FROM job_applications WHERE id = ?', [req.params.id]);

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const app = applications[0];
    
    // Basic analysis
    const analysis = {
      completeness: {
        resume: !!app.resume_path,
        coverLetter: !!(app.cover_letter || app.cover_letter_path),
        skills: !!app.skills,
        experience: !!app.experience_text,
        education: !!(app.college_name && app.graduation_year && app.cgpa),
        score: 0
      },
      qualifications: {
        hasCGPA: !!app.cgpa,
        hasGraduationYear: !!app.graduation_year,
        hasLocation: !!app.location,
        hasCollege: !!app.college_name
      },
      fileInfo: {
        resume: app.resume_path ? {
          path: app.resume_path,
          name: path.basename(app.resume_path),
          ext: path.extname(app.resume_path).toLowerCase()
        } : null,
        coverLetter: app.cover_letter_path ? {
          path: app.cover_letter_path,
          name: path.basename(app.cover_letter_path),
          ext: path.extname(app.cover_letter_path).toLowerCase()
        } : null
      }
    };

    // Calculate completeness score
    let score = 0;
    if (analysis.completeness.resume) score += 30;
    if (analysis.completeness.coverLetter) score += 20;
    if (analysis.completeness.skills) score += 15;
    if (analysis.completeness.experience) score += 15;
    if (analysis.completeness.education) score += 20;
    analysis.completeness.score = score;

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Get application analysis error:', error);
    res.status(500).json({ success: false, message: 'Failed to get application analysis' });
  }
};

