const { Router } = require('express');
const { authenticate } = require('../../middleware/auth');
const { login, logout, getCurrentAdmin, changePassword } = require('../../controllers/authController');

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentAdmin);
router.put('/change-password', authenticate, changePassword);

module.exports = router;


