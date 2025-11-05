const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const {
  getSubscribers,
  deleteSubscriber,
  toggleSubscriberStatus,
  exportSubscribers
} = require('../../controllers/newsletterController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/', getSubscribers);
router.delete('/:id', deleteSubscriber);
router.put('/:id/toggle', toggleSubscriberStatus);
router.get('/export', exportSubscribers);

module.exports = router;

