# Frontend
Consultancy - Business Consultation & Marketing Platform
A modern, full-stack web application for business consultation, design, and marketing services. Built with Next.js 16, React 19, and Tailwind CSS.
Features
Public Features

Hero Section with contact form for free consultation requests
Services Overview showcasing consultation, design, and marketing expertise
Projects Gallery displaying completed work with dynamic content
Client Testimonials with horizontal scrolling carousel
Newsletter Subscription for updates and insights
Responsive Design optimized for mobile, tablet, and desktop

Admin Dashboard

Projects Management - Create, edit, and delete projects with image uploads
Clients Management - Manage client testimonials and profiles
Contact Submissions - View and manage consultation requests
Newsletter Subscribers - Track email subscribers
Consultation Requests - Monitor and respond to inquiries

Tech Stack
Frontend

Framework: Next.js 16 (App Router)
UI Library: React 19
Styling: Tailwind CSS 4
UI Components: Radix UI primitives
Icons: Lucide React, Radix Icons
Forms: React Hook Form with Zod validation
Analytics: Vercel Analytics

Key Dependencies

next: 16.0.7
react: 19.2.0
tailwindcss: ^4.1.9
@radix-ui/*: Various UI components
lucide-react: ^0.454.0
class-variance-authority: ^0.7.1

Project Structure
frontend/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── clients/        # Client management
│   │   ├── consultations/  # Consultation requests
│   │   ├── messages/       # Contact submissions
│   │   ├── projects/       # Project management
│   │   ├── subscribers/    # Newsletter subscribers
│   │   └── layout.tsx      # Admin layout with sidebar
│   ├── api/                # API routes
│   │   └── consultations/  # Consultation endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── clients-section.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── interactive-background-section.tsx
│   ├── newsletter-section.tsx
│   ├── projects-section.tsx
│   ├── results-section.tsx
│   └── why-choose-us-section.tsx
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── util/
    ├── adminApi.ts         # Admin API calls
    └── publicApi.ts        # Public API calls
Getting Started
Prerequisites

Node.js 18+
npm or yarn
Backend API (separate repository)

Installation

Clone the repository:

bashgit clone https://github.com/yourusername/consultancy.git
cd consultancy/frontend

Install dependencies:

bashnpm install
# or
yarn install

Create a .env.local file in the frontend directory:

envNEXT_PUBLIC_API_URL=http://localhost:your-backend-port

Run the development server:

bashnpm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

Building for Production
bashnpm run build
npm run start
Admin Dashboard Access
Navigate to /admin to access the dashboard. The admin panel includes:

Projects (/admin/projects) - Manage project portfolio
Clients (/admin/clients) - Manage testimonials
Messages (/admin/messages) - View contact submissions
Subscribers (/admin/subscribers) - View newsletter subscribers

API Integration
The frontend expects a backend API with the following endpoints:
Public Endpoints

POST /api/contacts - Submit contact form
POST /api/newsletter - Subscribe to newsletter
GET /api/projects - Fetch all projects
GET /api/clients - Fetch all clients

Admin Endpoints

GET /api/admin/projects - Fetch projects
POST /api/admin/projects - Create project (multipart/form-data)
GET /api/admin/clients - Fetch clients
POST /api/admin/clients - Create client (multipart/form-data)
GET /api/admin/contacts - Fetch contact submissions
PUT /api/admin/contacts/:id - Update contact status
GET /api/admin/subscribers - Fetch subscribers

Features in Detail
Contact Form

Full name, email, mobile number, and city fields
Client-side validation
Success/error messaging
Responsive design

Projects Management

Image upload support
Local editing (frontend-only for edits)
Card-based display
Responsive grid layout

Clients Testimonials

Horizontal scrolling carousel
Navigation buttons
Auto-hide buttons at scroll boundaries
Responsive cards

Newsletter

Simple email subscription
Inline feedback
Integrated with backend API

Styling
The project uses a custom design system with:

CSS custom properties for theming
Dark mode support (configurable)
Consistent color palette (slate, orange, blue)
Tailwind CSS utility classes
Radix UI for accessible components

Environment Variables
env# Required
NEXT_PUBLIC_API_URL=your_backend_api_url

# Optional (if using Vercel Analytics)
VERCEL_ANALYTICS_ID=your_analytics_id
Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

Built with Next.js
UI components from Radix UI
Icons from Lucide
Styled with Tailwind CSS

#Backend
Backend API
A robust Node.js/Express backend API for managing projects, clients, contact submissions, and newsletter subscriptions with image processing capabilities.
Features

Project Management: Create and retrieve projects with image uploads
Client Management: Add and fetch client testimonials with profile images
Contact Form: Handle contact form submissions with status tracking
Newsletter: Manage email subscriptions with activation/reactivation
Image Processing: Automatic image optimization and resizing using Sharp
Security: Helmet, CORS, and compression middleware
Database: MongoDB with Mongoose ODM
Validation: Express-validator for input validation
Error Handling: Centralized error handling middleware

Tech Stack

Runtime: Node.js (ES Modules)
Framework: Express 5.2.1
Database: MongoDB with Mongoose 9.0.1
Image Processing: Sharp 0.34.5
File Upload: Multer 2.0.2
Security: Helmet 8.1.0, CORS 2.8.5
Utilities: Morgan (logging), Compression, Dotenv

Prerequisites

Node.js >= 18.0.0
MongoDB instance (local or cloud)
npm or yarn

Installation

Clone the repository:

bashgit clone <repository-url>
cd backend

Install dependencies:

bashnpm install

Create a .env file in the root directory:

envPORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
CLIENT_URL=http://localhost:3000
NODE_ENV=development

# Image Processing
IMAGE_WIDTH=450
IMAGE_HEIGHT=350
IMAGE_QUALITY=90
MAX_FILE_SIZE=5242880

Create upload directories (auto-created on startup):

src/uploads/
  ├── projects/
  └── clients/
Running the Application
Development Mode
bashnpm run dev
Production Mode
bashnpm start
The server will start on http://localhost:5000
API Endpoints
Public Routes (/api)
Projects

GET /api/projects - Get all projects

Response: { success, count, data }



Clients

GET /api/clients - Get all clients

Response: { success, count, data }



Contact Form

POST /api/contact - Submit contact form

Body: { fullName, email, mobileNumber, city }
Response: { success, message, data }



Newsletter

POST /api/subscribe - Subscribe to newsletter

Body: { email }
Response: { success, message, data }



Admin Routes (/api/admin)
Projects

POST /api/admin/projects - Add new project

Form Data: { projectName, description, image }
Content-Type: multipart/form-data
Response: { success, message, data }



Clients

POST /api/admin/clients - Add new client

Form Data: { clientName, clientDescription, clientDesignation, image }
Content-Type: multipart/form-data
Response: { success, message, data }



Contact Submissions

GET /api/admin/contacts - Get all contact submissions

Query Params: ?status=new&page=1&limit=20
Response: { success, count, total, page, pages, data }


PATCH /api/admin/contacts/:id - Update contact status

Body: { status: "new" | "read" | "responded" }
Response: { success, message, data }



Subscribers

GET /api/admin/subscribers - Get all subscribers

Query Params: ?isActive=true&page=1&limit=50
Response: { success, count, total, page, pages, data }



Health Check

GET /health - Server health check

Response: { success: true, message: "Server is running" }



Database Models
Project
javascript{
  projectName: String (required, max 100 chars),
  description: String (required, max 1000 chars),
  imageUrl: String (required),
  createdAt: Date,
  updatedAt: Date
}
Client
javascript{
  imageUrl: String (required),
  clientName: String (required, max 100 chars),
  clientDescription: String (required, max 500 chars),
  clientDesignation: String (required, max 100 chars),
  createdAt: Date,
  updatedAt: Date
}
ContactSubmission
javascript{
  fullName: String (required, max 100 chars),
  email: String (required, validated),
  mobileNumber: String (required),
  city: String (required, max 100 chars),
  status: String (enum: ['new', 'read', 'responded'], default: 'new'),
  createdAt: Date,
  updatedAt: Date
}
Subscriber
javascript{
  email: String (required, unique, validated),
  isActive: Boolean (default: true),
  subscribedAt: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
Image Processing
Uploaded images are automatically:

Resized to 450x350px (configurable via env variables)
Cropped to cover with center positioning
Compressed to 90% JPEG quality (configurable)
Saved with processed prefix

Original files are deleted after processing.
Error Handling
The API includes comprehensive error handling for:

Validation errors (400)
Duplicate entries (400)
Resource not found (404)
Cast errors (404)
Server errors (500)

Error responses include:
javascript{
  success: false,
  message: "Error description",
  stack: "Stack trace (development only)"
}
Security Features

Helmet: Sets security-related HTTP headers
CORS: Configured for specific client origins
Rate Limiting: Recommended to add (not currently implemented)
Input Validation: Express-validator for request validation
File Type Validation: Only images allowed (jpeg, jpg, png, gif, webp)
File Size Limits: 5MB default (configurable)

Project Structure
backend/
├── src/
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   └── public.controller.js
│   ├── db/
│   │   └── database.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── client.model.js
│   │   ├── contactSubmission.js
│   │   ├── project.model.js
│   │   └── subscriber.js
│   ├── routes/
│   │   ├── admin.route.js
│   │   └── public.route.js
│   ├── utils/
│   │   └── imageProcessor.js
│   └── uploads/
│       ├── projects/
│       └── clients/
├── .gitignore
├── package.json
├── server.js
└── README.md

Environment Variables
VariableDescriptionDefaultPORTServer port5000MONGODB_URIMongoDB connection string-CLIENT_URLFrontend URL for CORShttp://localhost:3000NODE_ENVEnvironment modedevelopmentIMAGE_WIDTHProcessed image width450IMAGE_HEIGHTProcessed image height350IMAGE_QUALITYJPEG quality (1-100)90MAX_FILE_SIZEMax upload size in bytes5242880 (5MB)
Scripts

npm start - Start production server
npm run dev - Start development server with nodemon
npm test - Run tests (not implemented)

Development
To add new features:

Create model in src/models/
Add controller logic in src/controllers/
Define routes in src/routes/
Update error handling if needed
Test endpoints using Postman or similar tools

Author
Mahendra Kumar Tamrakar
License
ISC
