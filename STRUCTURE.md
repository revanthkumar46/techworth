# Complete Folder Structure - Techworth Project

```
Techworth/
│
├── README.md                    # Project documentation
├── STRUCTURE.md                 # This file
├── package.json                  # Root package.json with concurrently scripts
│
├── frontend/                     # React.js Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── logo512.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation with mobile menu
│   │   │   └── Footer.jsx       # Footer with newsletter & social links
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Full homepage with all 8 sections
│   │   │   ├── About.jsx        # About page
│   │   │   ├── Services.jsx     # Services page with API integration
│   │   │   ├── Contact.jsx      # Contact form page
│   │   │   ├── Careers.jsx      # Careers page
│   │   │   ├── Terms.jsx        # Terms & Conditions
│   │   │   └── Privacy.jsx     # Privacy Policy
│   │   ├── App.js               # Main app with React Router
│   │   ├── index.js             # Entry point (includes Bootstrap CSS)
│   │   ├── index.css            # Tailwind CSS + custom utilities
│   │   ├── App.css              # (unused - kept by CRA)
│   │   ├── logo.svg             # (unused - kept by CRA)
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── App.test.js
│   ├── tailwind.config.js       # Tailwind config with custom colors
│   ├── postcss.config.js        # PostCSS config
│   ├── .env                     # Frontend environment variables
│   ├── package.json             # Frontend dependencies
│   └── package-lock.json
│
└── backend/                     # Node.js Backend
    ├── server.js                # Express server setup
    ├── routes/
    │   └── contact.js           # Contact form route with validation
    ├── controllers/
    │   └── contactController.js # Contact form handler (SMTP support)
    ├── models/                  # (for future DB integration)
    ├── .env                     # Backend environment variables
    ├── package.json             # Backend dependencies
    └── package-lock.json

```

## Key Files & Their Purpose

### Frontend

**components/Navbar.jsx**
- Sticky navigation bar
- Mobile-responsive menu
- Techworth branding with logo
- Active route highlighting
- Contact Us CTA button

**components/Footer.jsx**  
- 4-column layout (Brand, Links, Contact, Newsletter)
- Social media icons
- Newsletter signup form
- Copyright & legal links
- Dark theme with tech-accent

**pages/Home.jsx**
- Hero section with gradient background
- About Us section with image
- Services grid (4 services with icons)
- Why Choose Us (4 features)
- How We Work (4-step process)
- CTA section with gradient background
- All sections have Framer Motion animations

**Other Pages**
- Services: Fetches data from backend API
- Contact: Form submits to backend /api/contact
- About, Careers, Terms, Privacy: Static content pages

### Backend

**server.js**
- Express app setup
- CORS configuration
- Health check endpoint
- Services API endpoint
- Contact route integration

**routes/contact.js**
- POST /api/contact route
- Express-validator for input validation
- Calls contactController

**controllers/contactController.js**
- Handles contact form submissions
- Optional SMTP email integration
- Logs submissions if SMTP not configured

## Dependencies Installed

### Frontend
```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.9.4",
  "framer-motion": "^12.23.24",
  "axios": "^1.13.0",
  "bootstrap": "^5.x",
  "react-bootstrap": "^2.x",
  "react-icons": "^5.x",
  "tailwindcss": "^3.4.18",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.21"
}
```

### Backend
```json
{
  "express": "^5.1.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express-validator": "^7.3.0",
  "nodemailer": "^7.0.10",
  "nodemon": "^3.1.10"
}
```

## Design System

**Colors** (60-30-10 Rule)
- 60% Background: White (#FFFFFF)
- 30% Primary: Dark Blue (#2E4374)
- 10% Accent: Teal (#7C9D96)

**Custom Utilities**
- `.glass` - Glassmorphism effect
- `.glass-dark` - Dark glassmorphism
- `.hover-shadow` - Card hover effect
- `.rounded-4` - Larger border radius
- `.rounded-pill` - Pill-shaped buttons

**Icons Used** (React Icons)
- FaCode, FaMobileAlt, FaCloud, FaBug
- FaRocket, FaUsers, FaShieldCheck, FaSync
- FaCheckCircle, FaBolt, FaStar
- FaSearch, FaLightbulb, FaToolbox, FaHandshake
- FaLinkedin, FaTwitter, FaInstagram, FaFacebook
- FaEnvelope, FaPhone, FaMapMarkerAlt










