const { Router } = require('express');
const { body } = require('express-validator');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = Router();

const jobValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').trim().notEmpty().withMessage('Job type is required'),
  body('experience').trim().notEmpty().withMessage('Experience is required'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('requirements').optional().isArray().withMessage('Requirements must be an array'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array')
];

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', jobValidators, createJob);
router.put('/:id', jobValidators, updateJob);
router.delete('/:id', deleteJob);

module.exports = router;




