#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Taskify Pro Setup Script');
console.log('==========================\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkNodeVersion() {
  try {
    const version = process.version;
    const major = parseInt(version.slice(1).split('.')[0]);
    if (major < 16) {
      log('❌ Node.js version 16 or higher is required', 'red');
      log(`Current version: ${version}`, 'yellow');
      process.exit(1);
    }
    log(`✅ Node.js version: ${version}`, 'green');
  } catch (error) {
    log('❌ Could not check Node.js version', 'red');
    process.exit(1);
  }
}

function checkMongoDB() {
  log('\n📊 Checking MongoDB...', 'blue');
  
  // Check if MongoDB is running locally
  try {
    execSync('mongod --version', { stdio: 'ignore' });
    log('✅ MongoDB is installed', 'green');
    
    // Try to connect to local MongoDB
    try {
      execSync('mongosh --eval "db.runCommand({ping: 1})"', { stdio: 'ignore' });
      log('✅ MongoDB is running locally', 'green');
      return 'local';
    } catch (error) {
      log('⚠️  MongoDB is installed but not running', 'yellow');
      log('💡 Start MongoDB with: mongod', 'yellow');
      return 'not-running';
    }
  } catch (error) {
    log('❌ MongoDB is not installed', 'red');
    log('💡 Install MongoDB from: https://docs.mongodb.com/manual/installation/', 'yellow');
    log('💡 Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas', 'yellow');
    return 'not-installed';
  }
}

function createEnvFiles() {
  log('\n📝 Creating environment files...', 'blue');
  
  // Server .env
  const serverEnvPath = path.join(__dirname, 'server', '.env');
  if (!fs.existsSync(serverEnvPath)) {
    const serverEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/taskify

# JWT Configuration
JWT_SECRET=taskify-pro-secret-key-change-in-production
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
`;
    fs.writeFileSync(serverEnvPath, serverEnvContent);
    log('✅ Created server/.env', 'green');
  } else {
    log('✅ server/.env already exists', 'green');
  }
  
  // Client .env
  const clientEnvPath = path.join(__dirname, 'client', '.env');
  if (!fs.existsSync(clientEnvPath)) {
    const clientEnvContent = `# Frontend Configuration
VITE_API_URL=http://localhost:5000/api
`;
    fs.writeFileSync(clientEnvPath, clientEnvContent);
    log('✅ Created client/.env', 'green');
  } else {
    log('✅ client/.env already exists', 'green');
  }
}

function installDependencies() {
  log('\n📦 Installing dependencies...', 'blue');
  
  // Install server dependencies
  log('Installing server dependencies...', 'yellow');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'server'), stdio: 'inherit' });
    log('✅ Server dependencies installed', 'green');
  } catch (error) {
    log('❌ Failed to install server dependencies', 'red');
    process.exit(1);
  }
  
  // Install client dependencies
  log('Installing client dependencies...', 'yellow');
  try {
    execSync('npm install', { cwd: path.join(__dirname, 'client'), stdio: 'inherit' });
    log('✅ Client dependencies installed', 'green');
  } catch (error) {
    log('❌ Failed to install client dependencies', 'red');
    process.exit(1);
  }
}

function createStartScripts() {
  log('\n📜 Creating start scripts...', 'blue');
  
  // Update package.json scripts
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = {
    name: 'taskify-pro',
    version: '1.0.0',
    description: 'Taskify Pro - Complete Task Management Application',
    scripts: {
      'dev': 'concurrently \"npm run server\" \"npm run client\"',
      'server': 'cd server && npm run dev',
      'client': 'cd client && npm run dev',
      'build': 'cd client && npm run build',
      'start': 'cd server && npm start',
      'install-all': 'npm install && cd server && npm install && cd ../client && npm install',
      'setup': 'node setup.js'
    },
    devDependencies: {
      'concurrently': '^8.2.2'
    }
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  log('✅ Created root package.json', 'green');
  
  // Install concurrently for running both servers
  try {
    execSync('npm install', { stdio: 'inherit' });
    log('✅ Installed concurrently for development', 'green');
  } catch (error) {
    log('⚠️  Could not install concurrently', 'yellow');
  }
}

function showNextSteps(mongoStatus) {
  log('\n🎉 Setup completed successfully!', 'green');
  log('\n📋 Next steps:', 'blue');
  
  if (mongoStatus === 'not-installed') {
    log('1. Install MongoDB:', 'yellow');
    log('   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/', 'yellow');
    log('   - macOS: brew install mongodb-community', 'yellow');
    log('   - Linux: https://docs.mongodb.com/manual/administration/install-on-linux/', 'yellow');
    log('   - Or use MongoDB Atlas (cloud)', 'yellow');
  } else if (mongoStatus === 'not-running') {
    log('1. Start MongoDB:', 'yellow');
    log('   - Run: mongod', 'yellow');
    log('   - Or start as a service', 'yellow');
  }
  
  log('\n2. Start the application:', 'yellow');
  log('   npm run dev', 'green');
  
  log('\n3. Access the application:', 'yellow');
  log('   - Frontend: http://localhost:5173', 'green');
  log('   - Backend API: http://localhost:5000/api', 'green');
  log('   - Health check: http://localhost:5000/api/health', 'green');
  
  log('\n4. Create your first account:', 'yellow');
  log('   - Go to http://localhost:5173/register', 'green');
  log('   - Or use the default admin account (if configured)', 'green');
  
  log('\n📚 Documentation:', 'blue');
  log('   - Read DOCUMENTATION.md for detailed information', 'yellow');
  log('   - Check README.md for quick start guide', 'yellow');
  
  log('\n🔧 Troubleshooting:', 'blue');
  log('   - If MongoDB issues: Check the connection in server/.env', 'yellow');
  log('   - If API errors: Check server logs', 'yellow');
  log('   - If frontend issues: Check browser console', 'yellow');
}

// Main setup function
function main() {
  log('Starting Taskify Pro setup...', 'blue');
  
  // Check Node.js version
  checkNodeVersion();
  
  // Check MongoDB
  const mongoStatus = checkMongoDB();
  
  // Create environment files
  createEnvFiles();
  
  // Install dependencies
  installDependencies();
  
  // Create start scripts
  createStartScripts();
  
  // Show next steps
  showNextSteps(mongoStatus);
}

// Run setup
main(); 