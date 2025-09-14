# SkillForge - Render Deployment Guide

This guide will help you deploy both the frontend and backend of SkillForge to Render.

## 🚀 Quick Deployment Steps

### 1. Deploy Backend to Render

#### Step 1: Prepare Backend Repository

1. **Ensure your backend is in a separate folder or repository:**
   ```
   skillforge-backend/
   ├── src/
   ├── prisma/
   ├── package.json
   ├── Dockerfile
   └── ...
   ```

2. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

#### Step 2: Create Backend Service on Render

1. **Go to [Render](https://render.com) and sign in**

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your backend

3. **Configure the service:**
   - **Name**: `skillforge-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend` (if backend is in a subfolder)
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend.onrender.com
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

5. **Deploy the service**

#### Step 3: Add PostgreSQL Database

1. **Create a new PostgreSQL database:**
   - Click "New +" → "PostgreSQL"
   - **Name**: `skillforge-db`
   - **Database**: `skillforge_production`
   - **User**: `skillforge_user`
   - **Region**: Same as your backend service

2. **Copy the database URL** and add it to your backend environment variables:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

3. **Update your backend service** with the new DATABASE_URL

#### Step 4: Add Redis Cache (Optional but Recommended)

1. **Create a new Redis instance:**
   - Click "New +" → "Redis"
   - **Name**: `skillforge-redis`
   - **Region**: Same as your backend service

2. **Copy the Redis URL** and add it to your backend environment variables:
   ```
   REDIS_URL=redis://username:password@host:port
   ```

### 2. Deploy Frontend to Render

#### Step 1: Prepare Frontend

1. **Ensure your frontend is ready:**
   ```bash
   npm run build:netlify
   ```

2. **Create a static site build script** (if needed):
   ```json
   {
     "scripts": {
       "build:render": "vite build --mode production"
     }
   }
   ```

#### Step 2: Create Frontend Service on Render

1. **Create a new Static Site:**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure the static site:**
   - **Name**: `skillforge-frontend`
   - **Branch**: `main`
   - **Root Directory**: `.` (root of repository)
   - **Build Command**: `npm install && npm run build:render`
   - **Publish Directory**: `dist`

3. **Add Environment Variables:**
   ```
   VITE_API_URL=https://skillforge-backend.onrender.com/api
   VITE_SOCKET_URL=https://skillforge-backend.onrender.com
   ```

4. **Deploy the static site**

### 3. Update Backend with Frontend URL

1. **Update your backend environment variables:**
   ```
   FRONTEND_URL=https://skillforge-frontend.onrender.com
   ```

2. **Redeploy your backend service**

## 🔧 Render-Specific Configuration

### Backend Configuration

Create a `render.yaml` file in your repository root:

```yaml
services:
  - type: web
    name: skillforge-backend
    env: node
    plan: starter
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: JWT_SECRET
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: skillforge-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: skillforge-redis
          property: connectionString

databases:
  - name: skillforge-db
    plan: starter

  - name: skillforge-redis
    type: redis
    plan: starter
```

### Frontend Configuration

Update your `vite.config.ts` for Render:

```typescript
export default defineConfig(({ mode }) => ({
  // ... existing config
  build: {
    // ... existing build config
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // ... rest of config
}));
```

## 🌐 Custom Domains

### Backend Custom Domain

1. **Go to your backend service settings**
2. **Click "Custom Domains"**
3. **Add your domain**: `api.yourdomain.com`
4. **Configure DNS** as instructed by Render

### Frontend Custom Domain

1. **Go to your static site settings**
2. **Click "Custom Domains"**
3. **Add your domain**: `yourdomain.com`
4. **Configure DNS** as instructed by Render

## 🔒 SSL Certificates

Render automatically provides SSL certificates for:
- `*.onrender.com` domains
- Custom domains (after DNS configuration)

## 📊 Monitoring and Logs

### View Logs

1. **Backend logs**: Go to your backend service → "Logs"
2. **Frontend logs**: Go to your static site → "Logs"

### Health Checks

Your backend includes health check endpoints:
- `GET /health` - Basic health check
- `GET /api/health` - API health check

## 🚀 Deployment Commands

### Manual Deployment

```bash
# Backend
cd backend
npm install
npm run build
npm start

# Frontend
npm install
npm run build:render
```

### Using Render CLI

```bash
# Install Render CLI
npm install -g @render/cli

# Login to Render
render login

# Deploy backend
render deploy --service skillforge-backend

# Deploy frontend
render deploy --service skillforge-frontend
```

## 🔧 Environment Variables Reference

### Backend Environment Variables

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://skillforge-frontend.onrender.com
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Environment Variables

```env
VITE_API_URL=https://skillforge-backend.onrender.com/api
VITE_SOCKET_URL=https://skillforge-backend.onrender.com
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails:**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check build command and directory

2. **Database connection fails:**
   - Verify DATABASE_URL format
   - Check if database is accessible
   - Run migrations: `npx prisma migrate deploy`

3. **Frontend can't connect to backend:**
   - Verify VITE_API_URL is correct
   - Check CORS settings in backend
   - Ensure backend is deployed and running

4. **File uploads fail:**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper CORS headers

### Debug Commands

```bash
# Check backend health
curl https://skillforge-backend.onrender.com/health

# Check API health
curl https://skillforge-backend.onrender.com/api/health

# Test frontend
curl https://skillforge-frontend.onrender.com
```

## 📈 Performance Optimization

### Backend
- Use connection pooling for database
- Implement Redis caching
- Add rate limiting
- Optimize database queries

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement service worker caching
- Optimize bundle size

## 💰 Cost Optimization

### Free Tier Limits
- **Web Services**: 750 hours/month
- **PostgreSQL**: 1GB storage
- **Redis**: 25MB storage
- **Static Sites**: Unlimited

### Upgrade Considerations
- **Starter Plan**: $7/month per service
- **Standard Plan**: $25/month per service
- **Pro Plan**: $85/month per service

## 🎉 You're Ready!

Once deployed, your SkillForge application will be live on Render with:
- **Backend**: `https://skillforge-backend.onrender.com`
- **Frontend**: `https://skillforge-frontend.onrender.com`
- **Database**: Managed PostgreSQL
- **Cache**: Managed Redis
- **SSL**: Automatic HTTPS
- **Monitoring**: Built-in logs and metrics

## 📞 Support

If you encounter issues:
1. Check the Render documentation
2. Review service logs
3. Verify environment variables
4. Test endpoints directly
5. Check Render status page

Happy deploying! 🚀
