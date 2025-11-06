const { Router } = require('express');
const { authenticate, logActivity } = require('../../middleware/auth');
const {
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  markAsReplied
} = require('../../controllers/adminContactController');

const router = Router();

router.use(authenticate);
router.use(logActivity);

router.get('/', getContacts);
router.get('/:id', getContactById);
router.put('/:id/status', updateContactStatus);
router.put('/:id/replied', markAsReplied);
router.delete('/:id', deleteContact);

module.exports = router;


