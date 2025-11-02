const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const pool = require('./config/db');

const app = express();
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:3000'
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX || 200)
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'techworth-backend' });
});

// Static services list
app.get('/api/services', (req, res) => {
  res.json([
    { id: 1, name: 'Web Development', description: 'Modern web apps and sites' },
    { id: 2, name: 'Mobile Apps', description: 'iOS & Android development' },
    { id: 3, name: 'Cloud Solutions', description: 'AWS, Azure, GCP deployments' },
    { id: 4, name: 'Testing & QA', description: 'Automation and manual testing' }
  ]);
});

// Contact API
const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);

// Jobs API
const jobsRouter = require('./routes/jobs');
app.use('/api/jobs', jobsRouter);

// Applications API
const applicationsRouter = require('./routes/applications');
app.use('/api/applications', applicationsRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message && err.message.includes('Only PDF or Word documents are allowed')) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

async function logConnectionStatus() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.verify();
      console.log('✅ SMTP server connected successfully');
    } catch (error) {
      console.error('❌ SMTP connection failed:', error.message);
    }
  } else {
    console.log('ℹ️ SMTP credentials not provided; email notifications disabled');
  }
}

app.listen(PORT, async () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  await logConnectionStatus();
});









