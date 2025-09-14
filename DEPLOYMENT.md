# Netlify Deployment Guide

This guide will help you deploy the SkillForge Growth Hub to Netlify.

## Prerequisites

1. A Netlify account (free tier available)
2. Your project repository on GitHub, GitLab, or Bitbucket
3. Supabase project set up

## Environment Variables

Before deploying, you need to set up the following environment variables in Netlify:

### Required Variables

1. **VITE_SUPABASE_URL**: Your Supabase project URL
2. **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key

### Optional Variables

- **VITE_ENABLE_ANALYTICS**: Set to `true` to enable analytics (default: `false`)
- **VITE_ENABLE_DEBUG**: Set to `true` to enable debug mode (default: `false`)

## Deployment Steps

### Method 1: Automatic Deployment (Recommended)

1. **Connect Repository to Netlify**:
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Netlify will automatically detect the build settings from `netlify.toml`

2. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add the required variables listed above

3. **Deploy**:
   - Netlify will automatically build and deploy your site
   - Your site will be available at `https://your-site-name.netlify.app`

### Method 2: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build:netlify
   ```

2. **Deploy to Netlify**:
   ```bash
   # Install Netlify CLI if not already installed
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   npm run deploy:netlify
   ```

## Build Configuration

The project is configured with the following optimizations:

- **Code Splitting**: Pages are lazy-loaded for better performance
- **Chunk Optimization**: Vendor libraries are separated into chunks
- **Asset Optimization**: Static assets are cached for 1 year
- **SPA Routing**: All routes redirect to `index.html` for client-side routing

## Performance Features

- Lazy loading of page components
- Optimized bundle splitting
- Static asset caching
- Security headers
- Gzip compression (handled by Netlify)

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all environment variables are set
2. **Routing Issues**: Ensure the redirect rule in `netlify.toml` is working
3. **Supabase Connection**: Verify your Supabase URL and key are correct

### Build Logs

Check the build logs in Netlify dashboard if deployment fails:
- Go to Deploys → Click on the failed deploy → View build log

## Custom Domain

To use a custom domain:

1. Go to Site settings → Domain management
2. Add your custom domain
3. Update DNS records as instructed by Netlify
4. Enable HTTPS (automatic with Netlify)

## Monitoring

- **Analytics**: Available in Netlify dashboard
- **Performance**: Use Netlify's built-in performance monitoring
- **Error Tracking**: Check function logs in Netlify dashboard

## Security

The deployment includes:
- Security headers (XSS protection, content type options, etc.)
- HTTPS enforcement
- Frame options to prevent clickjacking
- Content Security Policy headers

## Support

For issues with:
- **Netlify**: Check [Netlify documentation](https://docs.netlify.com)
- **Supabase**: Check [Supabase documentation](https://supabase.com/docs)
- **This project**: Check the project's GitHub issues
