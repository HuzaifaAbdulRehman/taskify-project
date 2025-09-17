# 🚀 Taskify Pro

[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0.0+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.17.0-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite)](https://vitejs.dev/)

> A comprehensive task management application designed for students, teams, and small businesses. Create, organize, and track tasks effectively with advanced features like role-based access control, real-time notifications, and detailed analytics.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure User Registration & Login** - JWT-based authentication with password hashing
- **Role-Based Access Control** - Separate permissions for users and administrators
- **Session Management** - Secure token handling with automatic refresh

### 📝 Task Management
- **Create & Edit Tasks** - Comprehensive task creation with detailed descriptions
- **Task Organization** - Categorize tasks by type (Development, Design, Backend, etc.)
- **Priority Management** - Set task priorities (Low, Medium, High)
- **Due Date Tracking** - Never miss a deadline with due date management
- **Status Updates** - Track progress with To Do, In Progress, and Completed states

### 🎯 Advanced Features
- **Smart Filtering** - Filter tasks by status, priority, category, or assignee
- **Search Functionality** - Quickly find tasks with powerful search capabilities
- **Task Assignment** - Assign tasks to team members
- **Tag System** - Organize tasks with custom tags
- **Real-time Updates** - Dynamic task status updates across the platform

### 📊 Analytics & Reporting
- **Personal Dashboard** - Overview of your task statistics and progress
- **Admin Dashboard** - Comprehensive team management and analytics
- **Task Statistics** - Track completion rates and productivity metrics
- **User Management** - Admin tools for team oversight

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **Dark/Light Theme** - Customizable theme preferences
- **Toast Notifications** - Real-time feedback for user actions

## 🛠 Tech Stack

### Frontend
- **React 19.1.0** - Modern UI framework with hooks and context
- **Vite 7.0.4** - Lightning-fast build tool and development server
- **React Router DOM 7.7.1** - Client-side routing and navigation
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for styling
- **Axios 1.7.7** - HTTP client for API communication
- **React Toastify 10.0.5** - Beautiful toast notifications

### Backend
- **Node.js 16.0.0+** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB 8.17.0** - NoSQL database for data storage
- **Mongoose 8.17.0** - Object Document Mapper for MongoDB
- **JWT 9.0.2** - JSON Web Tokens for authentication
- **bcryptjs 2.4.3** - Password hashing and security
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware

### Development Tools
- **ESLint 9.30.1** - Code linting and quality assurance
- **Nodemon 3.0.1** - Development server with auto-restart
- **Concurrently 8.2.2** - Run multiple commands simultaneously

## 🚀 Installation

### Prerequisites
- **Node.js** (version 16.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/taskify-pro.git
   cd taskify-pro
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```
   This command will install dependencies for both frontend and backend.

3. **Environment Configuration**

   **Backend Environment** (`server/.env`):
   ```bash
   cp server/env.example server/.env
   ```
   
   Edit `server/.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskify-pro
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

   **Frontend Environment** (`client/.env`):
   ```bash
   cp client/env.example client/.env
   ```
   
   Edit `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers simultaneously.

### Manual Setup

If you prefer to set up each part separately:

**Backend Setup:**
```bash
cd server
npm install
npm run dev
```

**Frontend Setup:**
```bash
cd client
npm install
npm run dev
```

## 📖 Usage

### Getting Started

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application will load with the login screen

2. **Create an Account**
   - Click "Sign up here" on the login screen
   - Fill in your details (name, email, password)
   - Click "Create Account" to register

3. **Login**
   - Enter your email and password
   - Click "Sign In" to access your dashboard

### Using the Dashboard

1. **View Tasks**
   - Your dashboard shows all your tasks
   - Use the filter buttons to view tasks by status
   - Click on any task card to view details

2. **Create a New Task**
   - Click the "Add Task" button
   - Fill in the task details:
     - Title (required)
     - Description (required)
     - Category (select from dropdown)
     - Priority (Low, Medium, High)
     - Due Date (required)
     - Assigned To (required)
     - Tags (optional)
   - Click "Create Task" to save

3. **Edit Tasks**
   - Click on any task card
   - Click "Edit" to modify task details
   - Save changes when done

4. **Update Task Status**
   - Use the status dropdown on task cards
   - Choose from: To Do, In Progress, Completed

### Admin Features

If you have admin privileges:

1. **Access Admin Dashboard**
   - Navigate to the admin panel from the main menu
   - View team statistics and user management

2. **Manage Users**
   - View all registered users
   - Monitor user activity and task completion

## 📸 Screenshots

### Dashboard View
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing task overview and statistics*

### Task Creation
![Add Task](screenshots/add-task.png)
*Create new tasks with detailed information*

### Task Management
![Task Details](screenshots/task-details.png)
*View and edit individual task details*

### Admin Panel
![Admin Dashboard](screenshots/admin-dashboard.png)
*Administrative dashboard for team management*

### Mobile View
![Mobile](screenshots/mobile-view.png)
*Responsive design on mobile devices*

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - User login
POST /api/auth/logout      - User logout
```

### Task Endpoints
```
GET    /api/tasks          - Get all tasks
POST   /api/tasks          - Create new task
GET    /api/tasks/:id      - Get specific task
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
PATCH  /api/tasks/:id/status - Update task status
```

### User Endpoints
```
GET /api/users/profile     - Get user profile
PUT /api/users/profile     - Update user profile
GET /api/users             - Get all users (admin only)
```

### Admin Endpoints
```
GET /api/admin/users       - Get all users
GET /api/admin/statistics  - Get system statistics
GET /api/admin/reports     - Generate reports
```

## 📁 Project Structure

```
taskify-pro/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── ...
│   │   ├── contexts/      # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── AddTask.jsx
│   │   │   └── ...
│   │   ├── services/      # API service functions
│   │   │   └── api.js
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── models/           # Database models
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   ├── index.js          # Server entry point
│   └── package.json
├── DOCUMENTATION.md      # Detailed technical documentation
├── README.md            # This file
└── package.json         # Root package configuration
```

## 🤝 Contributing

We welcome contributions to Taskify Pro! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/taskify-pro.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Commit Your Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Your Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for code review and approval

### Development Guidelines

- **Code Style**: Follow ESLint configuration
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments
- **Security**: Follow security best practices

### Reporting Issues

Found a bug or have a feature request? Please open an issue with:
- Clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Taskify Pro Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

### Project Team
- **Project Lead**: [Your Name Here]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

### Support
- **Documentation**: [Full Documentation](DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/taskify-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/taskify-pro/discussions)

### Acknowledgments
- Thanks to all contributors who have helped make this project better
- Special thanks to the React and Node.js communities for excellent documentation
- Inspired by modern task management applications and productivity tools

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/your-username/taskify-pro?style=social)](https://github.com/your-username/taskify-pro)
[![GitHub forks](https://img.shields.io/github/forks/your-username/taskify-pro?style=social)](https://github.com/your-username/taskify-pro/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/your-username/taskify-pro?style=social)](https://github.com/your-username/taskify-pro)

Made with ❤️ by the Taskify Pro Team

</div>