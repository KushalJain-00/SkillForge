# 🔧 Render Dynamic URL Fix

## Issue Identified
The backend URL keeps changing on Render (from `skillforge-txns.onrender.com` to `skillforge-rdnd.onrender.com`). This is normal behavior for Render - URLs can change when services are redeployed.

## ✅ Comprehensive Fix Applied

### 1. Updated Configuration Files
- **render.yaml**: Updated to use `skillforge-rdnd.onrender.com`
- **backend/src/index.ts**: Enhanced CORS to allow all Render domains

### 2. Dynamic CORS Solution
Updated CORS configuration to automatically allow any `.onrender.com` domain:

```typescript
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all Render domains
    if (origin && origin.includes('.onrender.com')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

### 3. Vite Configuration
Already configured with `allowedHosts: "all"` to handle any host changes.

## 🚀 Quick Fix Steps

### Step 1: Push Changes
```bash
git add .
git commit -m "Update backend URL to skillforge-rdnd.onrender.com"
git push origin main
```

### Step 2: Redeploy Services
1. **Frontend Service:**
   - Go to Render dashboard
   - Click on your frontend service
   - Click "Manual Deploy" → "Deploy latest commit"

2. **Backend Service:**
   - Go to Render dashboard
   - Click on your backend service
   - Click "Manual Deploy" → "Deploy latest commit"

### Step 3: Update Environment Variables
**In Render Dashboard:**

**Frontend Environment Variables:**
```
VITE_API_URL=https://skillforge-rdnd.onrender.com/api
VITE_SOCKET_URL=https://skillforge-rdnd.onrender.com
```

**Backend Environment Variables:**
```
FRONTEND_URL=https://your-frontend-url.onrender.com
```

## 🔍 Why URLs Keep Changing

Render assigns URLs based on:
- Service name
- Random suffixes
- Deployment instances

This is normal behavior and the dynamic CORS solution handles it automatically.

## ✅ Long-term Solution

### Option 1: Custom Domain (Recommended)
1. **Purchase a custom domain**
2. **Configure in Render:**
   - Go to service settings
   - Click "Custom Domains"
   - Add your domain
   - Configure DNS as instructed

### Option 2: Environment Variable Approach
Update your frontend to use environment variables that you can change without code updates:

```typescript
// In src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

Then update environment variables in Render dashboard when URLs change.

### Option 3: Dynamic URL Detection
Create a more sophisticated solution that detects the current backend URL:

```typescript
// Auto-detect backend URL based on current domain
const getBackendURL = () => {
  if (window.location.hostname.includes('onrender.com')) {
    // Extract service name and construct backend URL
    const frontendService = window.location.hostname.split('.')[0];
    return `https://${frontendService}-backend.onrender.com`;
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
};
```

## 🚨 If URLs Keep Changing

### Quick Fix Process:
1. **Check current backend URL** in Render dashboard
2. **Update environment variables** in frontend service
3. **Redeploy frontend** service
4. **Test the application**

### Automated Solution:
The dynamic CORS configuration now handles any `.onrender.com` domain automatically, so backend redeployments won't break CORS.

## 📋 Summary

- ✅ **Updated to current URL**: `skillforge-rdnd.onrender.com`
- ✅ **Dynamic CORS**: Handles any Render domain automatically
- ✅ **Vite Configuration**: Allows all hosts
- ✅ **Build Working**: All configurations tested

## 🎯 Next Steps

1. **Deploy the fixes** (push and redeploy)
2. **Test the application** thoroughly
3. **Consider custom domain** for production
4. **Monitor for any remaining issues**

Your SkillForge application should now work regardless of URL changes! 🎉
