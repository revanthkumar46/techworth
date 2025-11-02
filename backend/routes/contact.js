const { Router } = require('express');
const { body } = require('express-validator');
const { handleContact } = require('../controllers/contactController');

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('phone').optional().trim().isLength({ min: 7, max: 20 }).withMessage('Phone must be between 7 and 20 characters'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
  ],
  handleContact
);

module.exports = router;









