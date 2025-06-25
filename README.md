# Pharmacy Course Management System

A modern, responsive web application for managing pharmacy course materials and content. Built with React, TypeScript, and a clean, professional interface designed specifically for educational institutions.

## Features

### Authentication
- Secure user authentication with session management
- Landing page with sign-in functionality
- Protected dashboard routes

### Course Management
- **Upload Courses**: Add new pharmacy courses with detailed information
- **View & Filter**: Browse courses with search and semester-based filtering
- **Edit & Delete**: Modify existing course details or remove outdated content
- **File Management**: Support for PDF and document file links

### Dashboard Features
- **Statistics Overview**: Total courses, active semesters, PDF materials count
- **Advanced Search**: Search by course name or description
- **Semester Filtering**: Filter courses by specific semesters (1-8)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Interface
- Modern, clean design with Tailwind CSS
- Professional color scheme optimized for educational environments
- Intuitive navigation with sidebar menu
- Loading states and error handling
- Toast notifications for user feedback

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for client-side routing
- **TanStack Query** for state management
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **React Hook Form** with Zod validation
- **Lucide React** for icons

### Backend (Optional)
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **Replit Auth** for authentication
- **Express Sessions** for session management

### Development Tools
- **TypeScript** for type safety
- **ESBuild** for fast compilation
- **PostCSS** with Autoprefixer
- **Drizzle Kit** for database management

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (if using backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pharmacy-course-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - For development, the app includes mock data functionality
   - For production, configure database and authentication environment variables

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser to `http://localhost:5000`
   - Use the "Sign in to Dashboard" button on the landing page

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── data/          # Mock data and types
│   │   └── lib/           # Utility functions
├── 
└── README.md            # This file
```

## Usage

### Adding a New Course

1. Sign in to the dashboard
2. Click "Add Course" button
3. Fill in the course details:
   - **Semester**: Select from 1-8
   - **Subject Name**: e.g., "Pharmacology I"
   - **Description**: Detailed course description
   - **File URL**: Link to course materials (PDF/documents)
4. Click "Upload Course" to save

### Managing Courses

- **View All Courses**: Main dashboard displays all courses in a table
- **Search**: Use the search bar to find courses by name or description
- **Filter**: Select a specific semester to filter courses
- **Edit**: Click the edit icon to modify course details
- **Delete**: Click the delete icon and confirm to remove a course

### Course Information Fields

- **Semester**: Academic semester (1-8)
- **Subject Name**: Course title
- **Description**: Detailed course information
- **File URL**: External link to course materials
- **Status**: Active, Draft, or Archived
- **Created/Updated**: Timestamps for tracking

## Sample Courses

The application includes sample pharmacy courses covering:
- Pharmaceutical Chemistry
- Pharmacology
- Clinical Pharmacy
- Pharmaceutical Microbiology
- Pharmaceutical Technology
- Pharmacoeconomics
- Advanced Clinical Pharmacy
- Pharmacy Management

## Development Mode

The application supports both mock data mode (frontend-only) and full-stack mode:

### Frontend-Only Mode
- Uses mock data and simulated authentication
- Perfect for development and testing
- No backend dependencies required
- Data persists during session only

### Full-Stack Mode
- Complete backend with PostgreSQL database
- Real authentication with Replit Auth
- Persistent data storage
- Production-ready deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is designed for educational institutions managing pharmacy course content.

## Support

For questions or issues, please contact the development team or create an issue in the repository.

---

**Note**: This application is designed specifically for pharmacy education management and includes features tailored to academic course administration.