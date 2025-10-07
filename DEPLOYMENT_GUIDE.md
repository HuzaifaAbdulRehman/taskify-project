# Complete Deployment Guide - Taskify Project

## Project URLs
- **Frontend (Vercel)**: https://taskify-project-eight.vercel.app
- **Backend (Azure)**: https://taskify-backend-api-eybgbpabffera5g0.centralindia-01.azurewebsites.net
- **API Health Check**: https://taskify-backend-api-eybgbpabffera5g0.centralindia-01.azurewebsites.net/api/health

---

## Part 1: Azure Backend Deployment (Step-by-Step)

### Prerequisites
- Azure for Students account (free credits)
- MongoDB Atlas account with cluster set up
- GitHub repository with your code

### Step 1: Create Azure Web App

1. Go to [portal.azure.com](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Web App"** and click **Create**
4. Fill in the form:
   - **Subscription**: Your Azure for Students subscription
   - **Resource Group**: Create new → `Taskify-RG` (or any name)
   - **Name**: `taskify-backend-api` (must be globally unique)
   - **Publish**: **Code**
   - **Runtime stack**: **Node 20 LTS** or **Node 22 LTS**
   - **Region**: **Central India** (or allowed region for students)
     - Common allowed regions: East US, Central US, West US 2, Central India
     - If deployment fails with "RequestDisallowedByAzure", try different region
   - **Pricing Plan**: **Free F1** or **Basic B1**
5. Click **Review + Create** → **Create**
6. Wait 1-2 minutes for deployment

### Step 2: Configure Environment Variables

1. Go to your Web App in Azure Portal
2. Click **Settings** → **Environment variables** (left menu)
3. Click **+ Add** for each variable:

```
NODE_ENV = production
```

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/taskify?retryWrites=true&w=majority
```
(Replace with your actual MongoDB Atlas connection string)

```
JWT_SECRET = your-super-secure-random-secret-key-here
```
(Use a strong random string - never use default!)

```
JWT_EXPIRE = 30d
```

```
CORS_ORIGIN = https://your-frontend-url.vercel.app
```
(Replace with your actual Vercel URL)

4. Click **Apply** at bottom
5. Click **Confirm**

**Note**: If you don't see "Environment variables", try:
- **Configuration** → **Application settings** tab
- Or **Settings** → **Configuration (preview)**

### Step 3: Connect MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Network Access** (left menu)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Confirm**

**Why?** Azure's IP addresses change dynamically, so we allow all IPs. For production, use Azure VNet integration for better security.

### Step 4: Setup GitHub Deployment

1. In Azure Portal → Your Web App → **Deployment Center** (under Deployment)
2. Click **Settings** tab
3. Select **Source**: **GitHub**
4. Click **Authorize** (sign in to GitHub if needed)
5. Select:
   - **Organization**: Your GitHub username
   - **Repository**: Your repository name
   - **Branch**: main
6. **Authentication Settings**:
   - **Authentication type**: **User-assigned identity**
   (If you see error about "Basic authentication disabled", use this option)
7. Click **Save** at top

**What happens?**
- Azure creates a GitHub Actions workflow automatically
- Creates Azure credentials as GitHub Secrets
- Auto-deploys on every push to main branch

### Step 5: Fix Workflow for Server Folder

Azure creates a workflow, but it needs to be updated to deploy from `/server` folder.

1. Go to your repository: `.github/workflows/main_taskify-backend-api.yml`
2. Update the build section:

```yaml
- name: npm install and build
  working-directory: ./server
  run: |
    npm ci --production
    npm run build --if-present
    tar -czf node_modules.tar.gz node_modules

- name: Upload artifact for deployment job
  uses: actions/upload-artifact@v4
  with:
    name: node-app
    path: ./server
```

3. Commit and push the changes

### Step 6: Add Startup Command (Optional)

1. Go to **Configuration** → **General settings** tab
2. Scroll down to find **Startup Command** field
   - **Alternative locations if not found**:
     - Under **Stack settings** tab
     - Under **Application settings** add: `SCM_DO_BUILD_DURING_DEPLOYMENT = true`
3. Enter: `npm start`
4. Click **Save**

### Step 7: Verify Deployment

**Check GitHub Actions:**
- https://github.com/YOUR_USERNAME/YOUR_REPO/actions
- Wait for green ✅ checkmark (2-3 minutes)

**Check Azure Logs:**
- Your Web App → **Log stream** (under Monitoring)
- Look for:
  - ✅ Server running on port 8080
  - ✅ MongoDB connected successfully

**Test API:**
```
https://your-app-name.azurewebsites.net/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Taskify API is running",
  "database": "connected"
}
```

---

## Part 2: Vercel Frontend Deployment

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**

### Step 2: Add Environment Variables

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add variable:
   - **Name**: `VITE_BACKEND_BASE_URL`
   - **Value**: `https://your-azure-backend.azurewebsites.net/api`
   - **Environments**: Check all (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** tab
6. Click **...** (three dots) on latest deployment → **Redeploy**

### Step 3: Verify Frontend

Visit your Vercel URL and test:
- Sign up
- Login
- Create tasks
- Update tasks
- Delete tasks

---

## Part 3: Automatic Deployments

### How It Works

**When you push to GitHub:**
```bash
git add .
git commit -m "your changes"
git push origin main
```

**Automatically happens:**
1. ✅ GitHub Actions triggers
2. ✅ Azure backend rebuilds and deploys (2-3 min)
3. ✅ Vercel frontend rebuilds and deploys (1-2 min)

**No manual redeployment needed!**

### Monitor Deployments

**Azure:**
- GitHub Actions: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
- Azure Portal → Deployment Center → Logs tab

**Vercel:**
- Vercel Dashboard → Your Project → Deployments tab

---

## Part 4: Common Issues & Solutions

### Issue 1: "Application Error" on Azure

**Symptoms:** Browser shows "Application Error"

**Solutions:**
1. Check Log stream for errors:
   - Web App → Log stream (under Monitoring)
2. Common causes:
   - Missing environment variables
   - Wrong MongoDB connection string
   - Missing `node_modules` (check workflow includes tar.gz step)

**Fix:**
- Verify all environment variables are set
- Check MongoDB Network Access allows 0.0.0.0/0
- Redeploy: `git commit --allow-empty -m "redeploy" && git push`

### Issue 2: "Cannot find module 'dotenv'"

**Cause:** Dependencies not deployed

**Fix:**
Ensure workflow has:
```yaml
npm ci --production
tar -czf node_modules.tar.gz node_modules
```

### Issue 3: Mixed Content Error (HTTP vs HTTPS)

**Symptoms:** Frontend can't connect to backend, console shows "Mixed Content" error

**Cause:** Frontend using HTTP instead of HTTPS

**Fix:**
1. Verify Vercel environment variable uses `https://`
2. Check no extra slashes in URL
3. Redeploy Vercel after changing env var

### Issue 4: CORS Error

**Symptoms:** "Access-Control-Allow-Origin" error in console

**Fix:**
1. In Azure environment variables, verify:
   ```
   CORS_ORIGIN = https://your-exact-vercel-url.vercel.app
   ```
2. No trailing slash in URL
3. Restart Azure app after changing

### Issue 5: MongoDB Connection Failed

**Symptoms:** "Invalid scheme" or "connection failed" in logs

**Fix:**
1. Verify connection string starts with `mongodb+srv://`
2. Password is correctly encoded (no special chars or use URL encoding)
3. Database name is included in connection string
4. Network Access in MongoDB Atlas allows 0.0.0.0/0

### Issue 6: Region Not Allowed (Azure Students)

**Symptoms:** "RequestDisallowedByAzure" error

**Fix:**
Try these regions (usually allowed for students):
- Central India
- East US
- Central US
- West US 2
- South Central US

---

## Part 5: File Structure Reference

### Files Created/Modified for Deployment

**Backend (server folder):**
- `server/web.config` - IIS configuration for Azure
- `server/.deployment` - Tells Azure which folder to deploy
- `.github/workflows/main_taskify-backend-api.yml` - GitHub Actions workflow

**Frontend (client folder):**
- `client/.env` - Environment variables (local only, not used by Vercel)
- Vercel uses Dashboard environment variables

**Root:**
- `DEPLOYMENT_GUIDE.md` - This file

---

## Part 6: Quick Reference Commands

### Local Development
```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
```

### Deploy Changes
```bash
# Make your changes, then:
git add .
git commit -m "describe your changes"
git push origin main

# Both Azure and Vercel auto-deploy!
```

### Check Deployment Status
```bash
# Azure backend logs
# Go to: Azure Portal → Your App → Log stream

# Or check GitHub Actions
# https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

### Manual Redeploy (if needed)
```bash
# Trigger redeployment without changes
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

---

## Part 7: Azure Portal Navigation Tips

### Finding Settings (Multiple Possible Locations)

**Environment Variables:**
- Primary: Settings → **Environment variables**
- Alternative: Settings → **Configuration** → Application settings tab
- Alternative: Settings → **Configuration (preview)**

**Startup Command:**
- Primary: Configuration → **General settings** tab
- Alternative: Configuration → **Stack settings** tab
- Alternative: Add env var `SCM_DO_BUILD_DURING_DEPLOYMENT=true` instead

**Deployment Logs:**
- Primary: Deployment → **Deployment Center** → Logs tab
- Alternative: Monitoring → **Log stream**

**App Logs:**
- Primary: Monitoring → **Log stream**
- Alternative: Diagnose and solve problems → **Application Logs**

### Navigation Pattern
Most settings follow this structure:
```
Your Web App
├── Overview (main page with URL)
├── Deployment
│   ├── Deployment Center (GitHub setup)
│   └── Deployment slots
├── Settings
│   ├── Environment variables (set env vars here)
│   ├── Configuration (backup location)
│   └── Authentication
└── Monitoring
    └── Log stream (view app logs)
```

---

## Part 8: Security Best Practices

### For Production Apps (Beyond This Project)

1. **JWT Secret**: Use a strong random string (32+ characters)
   ```bash
   # Generate secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **MongoDB**:
   - Don't use 0.0.0.0/0 in production
   - Use Azure VNet integration
   - Or add specific Azure outbound IPs

3. **CORS**:
   - Only allow specific frontend domains
   - Don't use wildcards (*) in production

4. **Environment Variables**:
   - Never commit `.env` files
   - Use Azure Key Vault for sensitive data in production

5. **HTTPS**:
   - Always enforced (Azure does this by default)
   - Custom domains need SSL certificates

---

## Part 9: Cost Management (Azure Students)

### Free Tier Limits
- **App Service**: F1 Free tier (60 CPU minutes/day)
- **Student Credit**: $100 for 12 months
- **MongoDB Atlas**: Free M0 tier (512 MB storage)

### Monitoring Usage
1. Azure Portal → **Cost Management + Billing**
2. Click your subscription
3. **Cost analysis** → See spending

### Stopping App (Save Credits)
If not using for a while:
1. Web App → **Overview**
2. Click **Stop** button at top
3. Click **Start** when needed again

---

## Summary Checklist

### Azure Backend Setup ✅
- [x] Created Web App with Node runtime
- [x] Added environment variables (NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRE, CORS_ORIGIN)
- [x] Connected GitHub with User-assigned identity auth
- [x] Fixed workflow to deploy from /server folder
- [x] Added node_modules packaging in workflow
- [x] Configured MongoDB Atlas network access (0.0.0.0/0)
- [x] Verified deployment with /api/health endpoint

### Vercel Frontend Setup ✅
- [x] Connected GitHub repository
- [x] Set root directory to /client
- [x] Added VITE_BACKEND_BASE_URL environment variable
- [x] Verified deployment and tested full app

### Auto-Deployment Setup ✅
- [x] GitHub Actions workflow configured
- [x] Azure auto-deploys on push to main
- [x] Vercel auto-deploys on push to main

---

## Support & Resources

**Azure Documentation:**
- https://docs.microsoft.com/azure/app-service/

**Vercel Documentation:**
- https://vercel.com/docs

**MongoDB Atlas:**
- https://docs.atlas.mongodb.com/

**Your Project:**
- GitHub: https://github.com/HuzaifaAbdulRehman/taskify-project
- Backend: https://taskify-backend-api-eybgbpabffera5g0.centralindia-01.azurewebsites.net
- Frontend: https://taskify-project-eight.vercel.app

---

**Last Updated**: October 7, 2025

**Deployment Status**: ✅ Successfully deployed and working!
