const { Router } = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitApplication } = require('../controllers/applicationController');

const router = Router();

const uploadsDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\-]/g, '_');
    cb(null, `${timestamp}-${cleanName}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or Word documents are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

const applicationValidators = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('collegeName').trim().notEmpty().withMessage('College name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('graduationYear').trim().notEmpty().withMessage('Graduation year is required'),
  body('cgpa').trim().notEmpty().withMessage('CGPA or Percentage is required'),
  body('gender').trim().notEmpty().withMessage('Gender is required'),
  body('skills').trim().notEmpty().withMessage('Skills are required'),
  body('technologies').trim().notEmpty().withMessage('Technologies are required')
];

router.post(
  '/',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }
  ]),
  applicationValidators,
  submitApplication
);

module.exports = router;






