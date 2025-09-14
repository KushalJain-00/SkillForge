# SkillForge - Netlify Deployment Guide

This guide will help you deploy the SkillForge frontend to Netlify and set up the backend for production.

## 🚀 Quick Deployment Steps

### 1. Deploy Frontend to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Build the project locally:**
   ```bash
   npm install
   npm run build:netlify
   ```

2. **Go to [Netlify](https://netlify.com) and sign in**

3. **Drag and drop the `dist` folder** to the Netlify dashboard

4. **Configure environment variables:**
   - Go to Site Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     VITE_SOCKET_URL=https://your-backend-url.railway.app
     ```

#### Option B: Deploy via Git (Continuous Deployment)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - Build command: `npm run build:netlify`
     - Publish directory: `dist`
     - Node version: `18`

3. **Add environment variables** (same as Option A)

### 2. Deploy Backend to Railway (Recommended)

#### Step 1: Prepare Backend

1. **Go to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your production values:
   ```env
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://username:password@host:port/database
   REDIS_URL=redis://username:password@host:port
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-netlify-site.netlify.app
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

#### Step 2: Deploy to Railway

1. **Go to [Railway](https://railway.app) and sign in**

2. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

3. **Add PostgreSQL database:**
   - In your Railway project, click "New"
   - Select "Database" → "PostgreSQL"
   - Copy the connection string to your `.env` file

4. **Add Redis (Optional but recommended):**
   - Click "New" → "Database" → "Redis"
   - Copy the connection string to your `.env` file

5. **Deploy:**
   - Railway will automatically build and deploy your backend
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

#### Step 3: Update Frontend Environment Variables

1. **Go back to your Netlify site settings**
2. **Update environment variables:**
   ```
   VITE_API_URL=https://your-app.railway.app/api
   VITE_SOCKET_URL=https://your-app.railway.app
   ```
3. **Redeploy your site**

### 3. Alternative Backend Hosting Options

#### Option A: Render.com

1. **Create a new Web Service**
2. **Connect your GitHub repository**
3. **Set build settings:**
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
4. **Add environment variables**
5. **Add PostgreSQL database**

#### Option B: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
3. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # ... add other variables
   ```
5. **Deploy:**
   ```bash
   git subtree push --prefix=backend heroku main
   ```

## 🔧 Configuration Files

### Frontend Configuration

The project includes these Netlify-specific configurations:

- `netlify.toml` - Netlify build and redirect settings
- `package.json` - Build scripts for Netlify
- `vite.config.ts` - Optimized for production builds

### Backend Configuration

- `backend/Dockerfile` - Container configuration
- `backend/docker-compose.yml` - Local development setup
- `backend/prisma/schema.prisma` - Database schema

## 🌐 Environment Variables

### Frontend (Netlify)
```
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_SOCKET_URL=https://your-backend-url.railway.app
```

### Backend (Railway/Render/Heroku)
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-netlify-site.netlify.app
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🚀 Deployment Checklist

### Frontend (Netlify)
- [ ] Code pushed to GitHub
- [ ] Netlify site connected to repository
- [ ] Build command set to `npm run build:netlify`
- [ ] Publish directory set to `dist`
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate enabled (automatic)

### Backend (Railway)
- [ ] Backend code in separate folder
- [ ] Environment variables configured
- [ ] PostgreSQL database added
- [ ] Redis cache added (optional)
- [ ] Domain configured
- [ ] Health check endpoint working

### Testing
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] File uploads work
- [ ] Real-time features work
- [ ] Database operations work

## 🔍 Troubleshooting

### Common Issues

1. **Build fails on Netlify:**
   - Check Node.js version (should be 18)
   - Verify all dependencies are in package.json
   - Check build command and publish directory

2. **API calls fail:**
   - Verify backend URL in environment variables
   - Check CORS settings in backend
   - Ensure backend is deployed and running

3. **Database connection fails:**
   - Verify DATABASE_URL format
   - Check if database is accessible
   - Run migrations: `npx prisma migrate deploy`

4. **File uploads fail:**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper CORS headers

### Support

If you encounter issues:
1. Check the deployment logs in Netlify/Railway
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check browser console for errors

## 📊 Performance Optimization

### Frontend
- Code splitting with React.lazy
- Optimized Vite build configuration
- Service worker for caching
- Compressed assets

### Backend
- Database indexing
- Redis caching
- Connection pooling
- Rate limiting

## 🔒 Security

### Frontend
- Content Security Policy headers
- XSS protection
- HTTPS enforcement

### Backend
- JWT authentication
- Input validation
- Rate limiting
- CORS configuration
- Helmet security headers

## 📈 Monitoring

### Recommended Tools
- **Frontend:** Netlify Analytics, Google Analytics
- **Backend:** Railway/Render metrics, Sentry for error tracking
- **Database:** PostgreSQL monitoring
- **Uptime:** UptimeRobot, Pingdom

## 🎉 You're Ready!

Once deployed, your SkillForge application will be live and accessible to users worldwide. The frontend will be served from Netlify's global CDN, and the backend will handle all API requests and real-time features.

**Frontend URL:** `https://your-site-name.netlify.app`
**Backend API:** `https://your-backend.railway.app/api`
