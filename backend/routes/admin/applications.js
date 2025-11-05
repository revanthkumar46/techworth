const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  downloadResume,
  previewResume,
  downloadCoverLetter,
  getApplicationAnalysis
} = require('../../controllers/adminApplicationController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.get('/:id/analysis', getApplicationAnalysis);
router.put('/:id/status', updateApplicationStatus);
router.get('/:id/resume', downloadResume);
router.get('/:id/resume/preview', previewResume);
router.get('/:id/cover-letter', downloadCoverLetter);
router.delete('/:id', deleteApplication);

module.exports = router;

