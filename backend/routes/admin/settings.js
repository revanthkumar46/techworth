const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const {
  getEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  getActivityLogs
} = require('../../controllers/settingsController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/email-templates', getEmailTemplates);
router.get('/email-templates/:id', getEmailTemplateById);
router.put('/email-templates/:id', updateEmailTemplate);
router.get('/activity-logs', getActivityLogs);

module.exports = router;

