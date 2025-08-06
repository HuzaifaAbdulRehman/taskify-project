# Taskify Pro Setup Guide

## Prerequisites

1. **Node.js** (version 16 or higher)
2. **MongoDB** (local or Atlas)
3. **Git** (for cloning)

## Quick Setup

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

#### Server Configuration
Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
```

#### Client Configuration
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `server/.env`

### 4. Run the Application

#### Development Mode (Both servers)
```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

#### Production Mode
```bash
# Build client
cd client
npm run build

# Start server (serves built client)
cd ../server
npm start
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## First Time Setup

1. Register a new account at http://localhost:5173/register
2. Or create an admin user directly in the database

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `server/.env`
- For Atlas: Whitelist your IP address

### Port Conflicts
- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in `client/.env`

### CORS Issues
- Update `CORS_ORIGIN` in `server/.env`
- Ensure frontend URL matches

## Environment Variables

### Server (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection | mongodb://localhost:27017/taskify |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | Token expiration | 30d |
| `CORS_ORIGIN` | Allowed origins | http://localhost:5173 |

### Client (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api | 