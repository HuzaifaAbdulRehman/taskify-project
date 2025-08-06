# Taskify Pro - Complete Task Management Application

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **MongoDB** (local or Atlas)
- **Git**

### Option 1: One-Click Start (Windows)
```bash
# Double-click or run:
start.bat
```

### Option 2: One-Click Start (Linux/Mac)
```bash
# Make executable and run:
chmod +x start.sh
./start.sh
```

### Option 3: Manual Setup
```bash
# 1. Install dependencies
npm run install-all

# 2. Create environment files (or run the scripts above)
# 3. Start MongoDB
mongod

# 4. Start the application
npm run dev
```

## 📋 Manual Setup Steps

### 1. Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or install separately:
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

#### Server Configuration (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
```

#### Client Configuration (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

#### Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `server/.env`

### 4. Run the Application

#### Development Mode
```bash
# Start both servers simultaneously
npm run dev

# Or start separately:
npm run server  # Terminal 1
npm run client  # Terminal 2
```

#### Production Mode
```bash
# Build client
npm run build

# Start server (serves built client)
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 👤 First Time Setup

1. **Register a new account** at http://localhost:5173/register
2. **Login** with your credentials
3. **Start creating tasks** and managing your workflow

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start both client and server
npm run server       # Start server only
npm run client       # Start client only

# Production
npm run build        # Build client for production
npm start           # Start server (serves built client)

# Setup
npm run install-all  # Install all dependencies
npm run setup       # Complete setup process
```

## 📁 Project Structure

```
taskify-pro/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── package.json
├── package.json           # Root package.json
├── start.bat             # Windows start script
├── start.sh              # Unix/Linux start script
└── setup.md              # Detailed setup guide
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- **Ensure MongoDB is running**: `mongod`
- **Check connection string** in `server/.env`
- **For Atlas**: Whitelist your IP address
- **Test connection**: Visit http://localhost:5000/api/health

### Port Conflicts
- **Change server port**: Update `PORT` in `server/.env`
- **Update client API URL**: Update `VITE_API_URL` in `client/.env`

### CORS Issues
- **Update CORS origin**: Update `CORS_ORIGIN` in `server/.env`
- **Ensure frontend URL matches** the CORS setting

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
rm -rf client/node_modules client/package-lock.json
npm run install-all
```

## 🚀 Features

### User Features
- ✅ User authentication and registration
- ✅ Task creation, editing, and deletion
- ✅ Task status management (Todo, In Progress, Completed)
- ✅ Task categorization and priority levels
- ✅ Due date management
- ✅ Task filtering and search
- ✅ User profile management
- ✅ Responsive design

### Admin Features
- ✅ User management
- ✅ System statistics
- ✅ Task analytics
- ✅ Admin dashboard

### Technical Features
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Real-time updates
- ✅ RESTful API
- ✅ MongoDB integration
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern React with hooks
- ✅ Express.js backend

## 📚 Documentation

- **Complete Documentation**: [DOCUMENTATION.md](DOCUMENTATION.md)
- **Setup Guide**: [setup.md](setup.md)
- **API Documentation**: Available at `/api/health` when running

## 🛡️ Security

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Role-based access control
- Secure environment variables

## 🔄 Development

### Adding New Features
1. **Backend**: Add routes in `server/routes/`
2. **Frontend**: Add components in `client/src/components/`
3. **Database**: Update models in `server/models/`

### Code Style
- **Frontend**: ESLint + Prettier
- **Backend**: Standard JavaScript
- **Database**: Mongoose schemas

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy server folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the documentation
3. Check the health endpoint: http://localhost:5000/api/health
4. Open an issue with detailed error information

---

**Happy Task Management! 🎉** 