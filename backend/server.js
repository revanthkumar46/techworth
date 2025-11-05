// Load environment variables FIRST, before any other imports that use them
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const pool = require('./config/db');

const app = express();

// CORS must be configured before other middleware
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

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

// Newsletter API (Public)
const newsletterRouter = require('./routes/newsletter');
app.use('/api/newsletter', newsletterRouter);

// Admin API Routes
const adminAuthRouter = require('./routes/admin/auth');
app.use('/api/admin/auth', adminAuthRouter);

const adminDashboardRouter = require('./routes/admin/dashboard');
app.use('/api/admin/dashboard', adminDashboardRouter);

const adminJobsRouter = require('./routes/admin/jobs');
app.use('/api/admin/jobs', adminJobsRouter);

const adminContactsRouter = require('./routes/admin/contacts');
app.use('/api/admin/contacts', adminContactsRouter);

const adminApplicationsRouter = require('./routes/admin/applications');
app.use('/api/admin/applications', adminApplicationsRouter);

const adminNewsletterRouter = require('./routes/admin/newsletter');
app.use('/api/admin/newsletter', adminNewsletterRouter);

const adminSettingsRouter = require('./routes/admin/settings');
app.use('/api/admin/settings', adminSettingsRouter);

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









