# Techworth Private Limited - Website

A modern, professional IT services website built with React.js frontend and Node.js backend.

## 🌟 Features

- **Modern UI Design**: 60-30-10 color rule with glassmorphism effects
- **Responsive Layout**: Bootstrap + Tailwind CSS for perfect mobile/desktop experience  
- **Full Page Content**: Hero, About, Services, Why Choose Us, How We Work, CTA sections
- **Professional Footer**: Newsletter signup, social links, contact info
- **React Icons**: Beautiful icons for all services and features
- **Unsplash Integration**: Professional 4K images for visual appeal
- **Backend API**: Express server with contact form endpoint
- **Framer Motion**: Smooth animations and transitions

## 📁 Project Structure

```
techworth/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation with Techworth branding
│   │   │   └── Footer.jsx       # Footer with newsletter & social links
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Full homepage with all sections
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── Privacy.jsx
│   │   ├── App.js              # Main app with routing
│   │   └── index.css           # Tailwind + custom utilities
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── server.js               # Express app setup
│   ├── routes/
│   │   └── contact.js          # Contact form route
│   ├── controllers/
│   │   └── contactController.js # Contact handler
│   └── package.json
│
└── package.json                # Root scripts to run both apps
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

```bash
# Install root dependencies (concurrently)
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies  
cd ../backend
npm install
```

### Run Development Servers

**Option 1: Run both from root**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎨 Design System

### Color Palette (60-30-10 Rule)

- **60% Background**: White/Light Gray
- **30% Primary**: #2E4374 (Dark Blue)
- **10% Accent**: #7C9D96 (Teal)

### Technologies Used

- **Frontend**: React 19, React Router, Tailwind CSS, Bootstrap 5, Framer Motion, React Icons
- **Backend**: Node.js, Express, CORS, Nodemailer
- **Styling**: Custom utilities for glassmorphism effects
- **Images**: Unsplash API integration

## 📝 Homepage Sections

1. **Hero Section**: Gradient background with CTA buttons
2. **About Us**: Mission and vision with Unsplash image
3. **Services**: Grid of 4 service cards with icons
4. **Why Choose Us**: 4 feature cards with highlights
5. **How We Work**: 4-step process visualization
6. **CTA Section**: Final call-to-action with benefits
7. **Footer**: Newsletter, social links, contact info

## 🔧 Environment Variables

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```
PORT=5000
ORIGIN=http://localhost:3000
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
CONTACT_TO=info@techworth.com
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel or Netlify
3. Set environment variables
4. Deploy

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

## 📞 Contact

- **Email**: info@techworth.co.in
- **Phone**: +91 9XXXXXXXXX
- **Address**: Plot No. XX, Business Tower, Hyderabad, Telangana, India

## 📄 License

© 2025 Techworth Pvt. Ltd. All Rights Reserved.











