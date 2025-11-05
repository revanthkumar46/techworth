const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const { getStats, getRecentActivity } = require('../../controllers/dashboardController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/stats', getStats);
router.get('/recent-activity', getRecentActivity);

module.exports = router;

