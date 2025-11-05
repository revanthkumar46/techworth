const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobApplications
} = require('../../controllers/adminJobController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/:id/applications', getJobApplications);

module.exports = router;

