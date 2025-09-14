# 🔧 Render Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Frontend Not Loading (Blank Page)

#### Issue: SPA Routing Problem
**Symptoms:** Page loads but shows blank white screen or 404 errors on refresh

**Solution:** Add `_redirects` file for proper SPA routing

Create `public/_redirects` file:
```
/*    /index.html   200
```

#### Issue: Build Command Problems
**Symptoms:** Build fails or static site shows errors

**Solution:** Update build configuration

**For Static Site:**
- Build Command: `npm install && npm run build:render`
- Publish Directory: `dist`

**For Web Service (if using as web service):**
- Build Command: `npm install && npm run build:render && npm install -g serve`
- Start Command: `serve -s dist -l 10000`

### 2. Backend Not Starting

#### Issue: Port Configuration
**Symptoms:** Backend service fails to start

**Solution:** Ensure port is set to 10000 (Render's default)

**Check in backend/src/index.ts:**
```typescript
const PORT = process.env.PORT || 10000;
```

#### Issue: Database Connection
**Symptoms:** Backend starts but database operations fail

**Solution:** Verify DATABASE_URL format

**Correct format:**
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. Environment Variables Issues

#### Issue: Missing Environment Variables
**Symptoms:** API calls fail, authentication doesn't work

**Solution:** Check all required variables are set

**Frontend Variables:**
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_SOCKET_URL=https://your-backend.onrender.com
```

**Backend Variables:**
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://...
FRONTEND_URL=https://your-frontend.onrender.com
```

### 4. CORS Issues

#### Issue: Frontend can't connect to backend
**Symptoms:** CORS errors in browser console

**Solution:** Update CORS configuration in backend

**In backend/src/index.ts:**
```typescript
app.use(cors({
  origin: [
    'https://your-frontend.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### 5. Build Failures

#### Issue: Dependencies not installing
**Symptoms:** Build fails during npm install

**Solution:** Check package.json and lock files

**Ensure you have:**
- `package-lock.json` committed
- All dependencies in `package.json`
- Correct Node.js version (18+)

## Step-by-Step Fix Process

### Step 1: Check Render Logs

1. **Go to your Render dashboard**
2. **Click on your service**
3. **Go to "Logs" tab**
4. **Look for error messages**

### Step 2: Verify Build Configuration

**For Frontend (Static Site):**
```
Name: skillforge-frontend
Environment: Static Site
Build Command: npm install && npm run build:render
Publish Directory: dist
```

**For Backend (Web Service):**
```
Name: skillforge-backend
Environment: Node
Build Command: cd backend && npm install && npm run build
Start Command: cd backend && npm start
```

### Step 3: Check Environment Variables

**In Render Dashboard:**
1. Go to your service
2. Click "Environment"
3. Verify all variables are set correctly

### Step 4: Test Endpoints

**Test backend health:**
```bash
curl https://your-backend.onrender.com/health
```

**Test API:**
```bash
curl https://your-backend.onrender.com/api/health
```

**Test frontend:**
```bash
curl https://your-frontend.onrender.com
```

## Quick Fixes

### Fix 1: Add _redirects file

Create `public/_redirects`:
```
/*    /index.html   200
```

### Fix 2: Update vite.config.ts

```typescript
export default defineConfig(({ mode }) => ({
  // ... existing config
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
}));
```

### Fix 3: Update render.yaml

```yaml
services:
  - type: web
    name: skillforge-backend
    env: node
    plan: starter
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      # ... other variables

  - type: web
    name: skillforge-frontend
    env: static
    plan: starter
    buildCommand: npm install && npm run build:render
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

## Debug Commands

### Check if services are running:
```bash
# Backend health
curl -I https://your-backend.onrender.com/health

# Frontend
curl -I https://your-frontend.onrender.com

# API endpoint
curl -I https://your-backend.onrender.com/api/health
```

### Check build locally:
```bash
# Frontend
npm run build:render
ls -la dist/

# Backend
cd backend
npm run build
ls -la dist/
```

## Common Error Messages

### "Cannot GET /"
- **Cause:** SPA routing issue
- **Fix:** Add `_redirects` file

### "Module not found"
- **Cause:** Missing dependencies
- **Fix:** Check package.json and run `npm install`

### "Port already in use"
- **Cause:** Port configuration issue
- **Fix:** Use `process.env.PORT || 10000`

### "Database connection failed"
- **Cause:** Wrong DATABASE_URL
- **Fix:** Check database URL format

### "CORS error"
- **Cause:** CORS configuration
- **Fix:** Update CORS settings in backend

## Still Having Issues?

1. **Check Render Status:** https://status.render.com
2. **Review Logs:** Check both build and runtime logs
3. **Test Locally:** Ensure everything works locally first
4. **Contact Support:** Use Render's support if needed

## Quick Checklist

- [ ] `_redirects` file exists in `public/`
- [ ] Build command is correct
- [ ] Publish directory is `dist`
- [ ] Environment variables are set
- [ ] Backend is running on port 10000
- [ ] CORS is configured correctly
- [ ] Database URL is correct
- [ ] All dependencies are in package.json
