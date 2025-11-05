const { Router } = require('express');
const { body } = require('express-validator');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = Router();

const jobValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('category').optional().trim(),
  body('location').optional().trim(),
  body('type').optional().isIn(['full_time', 'part_time', 'contract', 'internship']).withMessage('Invalid job type'),
  body('requirements').optional(),
  body('salaryRange').optional().trim(),
  body('status').optional().isIn(['draft', 'active', 'closed']).withMessage('Invalid status'),
  body('applicationDeadline').optional().isISO8601().withMessage('Invalid date format')
];

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', jobValidators, createJob);
router.put('/:id', jobValidators, updateJob);
router.delete('/:id', deleteJob);

module.exports = router;




