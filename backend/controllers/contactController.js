const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const pool = require('../config/db');

exports.handleContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, subject, phone, message } = req.body;

  try {
    await pool.execute(
      `INSERT INTO contact_messages (name, email, subject, phone, message)
       VALUES (?, ?, ?, ?, ?)` ,
      [name, email, subject, phone || null, message]
    );

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      await transporter.sendMail({
        from: `"Techworth Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        subject: `New contact from ${name}`,
        text: `From: ${name} <${email}>\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\n\n${message}`
      });
    } else {
      console.log('Contact form submission:', { name, email, subject, phone, message });
    }

    res.json({ ok: true, message: 'Submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Failed to submit' });
  }
};









