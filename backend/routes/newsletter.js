const { Router } = require('express');
const { body } = require('express-validator');
const { subscribe } = require('../controllers/newsletterController');

const router = Router();

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Valid email is required')
  ],
  subscribe
);

module.exports = router;

