# Application Management System - User Guide

## ✅ Database Migration Complete

The database has been successfully migrated with all required columns:
- ✓ `cover_letter_path` - Stores file path for uploaded cover letters
- ✓ `cover_letter_text` - Stores text-based cover letters
- ✓ `experience_text` - Stores candidate experience details
- ✓ `skills` - Stores candidate skills
- ✓ `technologies` - Stores technologies known by candidate
- ✓ `status` - Application status with workflow support

## 🚀 Features Overview

### 1. Resume Preview & Download
- **Preview**: Click the PDF icon in the applications table to preview resumes in a new window
- **Download**: Use the download button to save resumes locally
- **Supported Formats**: PDF (preview), Word documents (download only)

### 2. Application Analysis
Every application automatically gets analyzed for:
- **Completeness Score**: 0-100% based on required fields
  - Resume: 30 points
  - Cover Letter: 20 points
  - Skills: 15 points
  - Experience: 15 points
  - Education: 20 points
- **File Information**: Shows resume and cover letter file details
- **Qualification Checklist**: Visual indicators for all required information

### 3. Recruitment Workflow

#### Status Flow:
```
Pending → Reviewed → Shortlisted → Hired
         ↓
      Rejected
```

#### Workflow Actions:
1. **Accept & Review** (for Pending applications)
   - Moves application from "Pending" to "Reviewed"
   - Adds automatic note: "Application accepted for review"

2. **Proceed to Next Step**
   - Automatically advances to next status:
     - Pending → Reviewed
     - Reviewed → Shortlisted
     - Shortlisted → Hired
   - Confirmation dialog prevents accidental status changes

3. **Manual Status Update**
   - Dropdown in application detail modal
   - Optional admin notes can be added
   - Supports all statuses: Pending, Reviewed, Shortlisted, Rejected, Hired

### 4. Cover Letter Management
- **Text Cover Letters**: Displayed directly in the application detail view
- **File Cover Letters**: Download button available when file is uploaded
- **Both Types**: Can exist simultaneously (text + file)

## 📋 API Endpoints

### Admin Endpoints (Authentication Required)

```
GET    /api/admin/applications              - List all applications
GET    /api/admin/applications/:id          - Get application details
GET    /api/admin/applications/:id/analysis  - Get application analysis
GET    /api/admin/applications/:id/resume/preview - Preview resume (PDF)
GET    /api/admin/applications/:id/resume    - Download resume
GET    /api/admin/applications/:id/cover-letter - Download cover letter file
PUT    /api/admin/applications/:id/status   - Update application status
DELETE /api/admin/applications/:id          - Delete application
```

## 🧪 Testing the Features

### Test Resume Preview:
1. Navigate to Admin Panel → Applications
2. Find an application with a resume (PDF icon visible)
3. Click the PDF icon to open preview in new window
4. Verify PDF loads correctly in browser

### Test Application Analysis:
1. Click the eye icon (👁️) on any application
2. Check the "Application Analysis" card at the top
3. Verify completeness score is calculated correctly
4. Check file information is displayed

### Test Workflow Actions:
1. Find an application with "Pending" status
2. Click "Accept & Review" button
3. Verify status changes to "Reviewed"
4. Use "Proceed to Next Step" to advance further
5. Test status dropdown for manual changes

### Test Cover Letter:
1. Open application detail view
2. Scroll to "Cover Letter" section
3. If text cover letter exists, it displays in a scrollable box
4. If file cover letter exists, download button is available

## 🔧 Troubleshooting

### Resume Preview Not Working:
- **Issue**: PDF opens but doesn't display
  - **Solution**: Check browser PDF viewer settings
  - **Alternative**: Use download button instead

- **Issue**: Preview shows "Not Found"
  - **Solution**: Verify file exists in `backend/uploads/resumes/`
  - **Check**: File path in database matches actual file location

### Analysis Score Shows 0%:
- **Check**: Application has required fields filled
- **Verify**: Resume file is uploaded
- **Note**: Score is calculated based on available data

### Status Not Updating:
- **Check**: Admin authentication is active
- **Verify**: Network requests are successful (check browser console)
- **Solution**: Refresh page after status update

## 📝 Best Practices

1. **Review Process**:
   - Start with analysis score to quickly assess completeness
   - Preview resume before making decisions
   - Add admin notes for important observations
   - Use workflow buttons for consistent status progression

2. **File Management**:
   - Resumes are stored in `backend/uploads/resumes/`
   - Cover letter files are stored in `backend/uploads/resumes/`
   - Files are automatically cleaned up when applications are deleted

3. **Status Management**:
   - Use "Accept & Review" for initial screening
   - Use "Proceed to Next Step" for standard workflow
   - Use manual dropdown for custom status changes
   - Always add notes for rejected applications

## 🎯 Quick Reference

| Action | Button | Location |
|--------|--------|----------|
| Preview Resume | PDF Icon | Applications Table / Detail View |
| Download Resume | Download Icon | Applications Table / Detail View |
| View Details | Eye Icon | Applications Table |
| Accept Application | "Accept & Review" | Detail Modal Footer |
| Advance Status | "Proceed to Next Step" | Detail Modal Footer |
| Change Status | Status Dropdown | Detail Modal Footer |
| Delete Application | Trash Icon | Applications Table |

## 🔄 Running Migration Again

If you need to run the migration again:

```bash
cd backend
npm run migrate
# OR
node scripts/migrateApplications.js
```

The migration is idempotent - it's safe to run multiple times. It will only add columns that don't exist.

