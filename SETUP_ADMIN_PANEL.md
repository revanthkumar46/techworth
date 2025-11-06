# Admin Panel Setup Guide

## Overview
This guide will help you set up the admin panel to manage all jobs from a unified interface. The system has been migrated to use a single `jobs` table for both the public careers page and the admin panel.

## Prerequisites
- MySQL database running with `techworth_db` database
- Node.js installed
- All npm packages installed (`npm install` in both `frontend` and `backend`)

## Step 1: Run Database Schema
Make sure all admin tables exist. If you haven't run the schema yet:

```bash
mysql -u root -p techworth_db < backend/database/schema.sql
```

Or manually run the SQL file through MySQL Workbench.

## Step 2: Generate Admin Password Hash
Generate the password hash for the default admin account:

```bash
node backend/scripts/generatePasswordHash.js admin123
```

Copy the generated hash and update it in `backend/database/schema.sql` if needed, or directly insert into the database:

```sql
UPDATE admin_users SET password_hash = '<generated_hash>' WHERE username = 'admin';
```

## Step 3: Migrate Existing Jobs
Migrate the 20 existing jobs from `job_openings` table to `jobs` table:

```bash
node backend/scripts/migrateJobs.js
```

This will:
- Copy all jobs from `job_openings` to `jobs` table
- Set them as 'active' status
- Map fields appropriately
- Skip duplicates if any

## Step 4: Verify Environment Variables
Ensure `backend/.env` has:

```
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=techworth_db
PORT=5000
ORIGIN=http://localhost:3000
```

## Step 5: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Step 6: Access Admin Panel

1. Navigate to: http://localhost:3000/admin/login
2. Login with:
   - Username: `admin`
   - Password: `admin123` (or the password you set)

## Admin Panel Features

### Jobs Management (`/admin/jobs`)
- **View All Jobs**: See all jobs with pagination
- **Create New Job**: Add new job postings
- **Edit Job**: Update job details
- **Delete Job**: Remove jobs
- **Filter by Status**: Filter jobs by draft/active/closed
- **Search**: Search jobs by title, description, or location
- **View Applications**: See all applications for a specific job

### Job Status
- **Draft**: Job is not visible to public
- **Active**: Job is visible on careers page
- **Closed**: Job is not accepting new applications

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin info
- `PUT /api/admin/auth/change-password` - Change password

### Jobs Management
- `GET /api/admin/jobs` - List all jobs (with filters)
- `GET /api/admin/jobs/:id` - Get job details
- `POST /api/admin/jobs` - Create new job
- `PUT /api/admin/jobs/:id` - Update job
- `DELETE /api/admin/jobs/:id` - Delete job
- `GET /api/admin/jobs/:id/applications` - Get applications for a job

### Public Jobs API (Updated)
- `GET /api/jobs` - Get only active jobs (public)
- `GET /api/jobs/:id` - Get active job by ID (public)

## Important Notes

1. **Table Migration**: After migration, you can keep or remove the `job_openings` table. The system now uses the `jobs` table exclusively.

2. **Job Status**: Only jobs with status='active' will appear on the public careers page.

3. **Default Admin**: Change the default password after first login for security.

4. **Database Schema**: The `jobs` table structure is:
   - `id`, `title`, `description`, `requirements` (TEXT)
   - `location`, `job_type` (enum), `salary_range`, `category`
   - `status` (enum: draft/active/closed)
   - `application_deadline`, `created_at`, `updated_at`

## Troubleshooting

### "Authentication required" error
- Check if JWT_SECRET is set in `.env`
- Verify admin user exists in database
- Check if token cookie is being sent (check browser dev tools)

### Jobs not appearing after migration
- Verify migration completed successfully
- Check job status is set to 'active'
- Check database connection

### Cannot login
- Verify password hash is correct
- Check admin user `is_active` field is 1
- Check backend logs for errors

## Next Steps

After setup:
1. Review and update migrated jobs
2. Create additional admin users if needed
3. Customize job templates
4. Set up email notifications for new applications


