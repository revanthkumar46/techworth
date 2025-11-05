-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table (unified table for admin and public)
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  requirements TEXT,
  location VARCHAR(100),
  job_type ENUM('full_time', 'part_time', 'contract', 'internship') DEFAULT 'full_time',
  salary_range VARCHAR(50),
  category VARCHAR(50),
  status ENUM('draft', 'active', 'closed') DEFAULT 'draft',
  application_deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mobile VARCHAR(20),
  college_name VARCHAR(200),
  location VARCHAR(100),
  graduation_year INT,
  cgpa VARCHAR(10),
  gender ENUM('male', 'female', 'other'),
  resume_path VARCHAR(500),
  cover_letter TEXT,
  cover_letter_path VARCHAR(500),
  cover_letter_text TEXT,
  experience_text TEXT,
  skills TEXT,
  technologies TEXT,
  status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Contact Messages Table (update if exists)
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP NULL
);

-- Admin Activity Logs Table
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  action VARCHAR(200) NOT NULL,
  resource_type VARCHAR(50),
  resource_id INT,
  details JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Email Templates Table
CREATE TABLE IF NOT EXISTS email_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  variables JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Email History Table
CREATE TABLE IF NOT EXISTS email_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  template_id INT,
  recipient_email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  status ENUM('sent', 'failed', 'pending') DEFAULT 'pending',
  error_message TEXT,
  sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (template_id) REFERENCES email_templates(id) ON DELETE SET NULL
);

-- Application Status History Table
CREATE TABLE IF NOT EXISTS application_status_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, role)
VALUES ('admin', 'admin@techworth.com', '$2b$10$Q5JcRsnN5GQdjmV4sNfXOO0HFr9W4gv/ADBUX70mQYQuNPURYnkRa', 'super_admin')
ON DUPLICATE KEY UPDATE username=username;

-- Insert default email templates
INSERT INTO email_templates (name, subject, body, variables) VALUES
('interview_invitation', 'Interview Invitation - Techworth', 
'Dear {{full_name}},\n\nThank you for your interest in the {{job_title}} position at Techworth.\n\nWe are pleased to invite you for an interview on {{interview_date}} at {{interview_time}}.\n\nLocation: {{interview_location}}\n\nPlease confirm your availability.\n\nBest regards,\nTechworth Team',
'["full_name", "job_title", "interview_date", "interview_time", "interview_location"]'),
('application_received', 'Application Received - Techworth',
'Dear {{full_name}},\n\nWe have received your application for the {{job_title}} position.\n\nWe will review your application and get back to you soon.\n\nThank you for your interest in Techworth.\n\nBest regards,\nTechworth Team',
'["full_name", "job_title"]')
ON DUPLICATE KEY UPDATE name=name;

