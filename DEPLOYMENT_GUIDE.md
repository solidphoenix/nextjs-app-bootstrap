# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. Save the settings

### 2. Deploy the Site

The site will automatically deploy when you:
- Push to the `main` branch
- Manually trigger the workflow from the Actions tab

### 3. Access Your Site

Once deployed, your site will be available at:
```
https://[username].github.io/[repository-name]/
```

For this repository:
```
https://solidphoenix.github.io/nextjs-app-bootstrap/
```

## Manual Deployment

If you need to deploy manually:

1. Go to the "Actions" tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## Important Notes

### Data Persistence
- Survey responses are stored in browser localStorage
- Data is **not** shared between users or devices
- Data persists only in the browser where it was entered
- For a production survey with shared responses, consider integrating a backend service

### Configuration
If you need to deploy to a subfolder (not root):
1. The `next.config.js` is already configured to use `basePath`
2. Set the `NEXT_PUBLIC_BASE_PATH` environment variable if needed

### Troubleshooting

**Build fails:**
- Check the Actions tab for error logs
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**404 errors:**
- Ensure GitHub Pages is set to "GitHub Actions" as the source
- Check that the deployment completed successfully
- Clear browser cache

**Styling issues:**
- Verify Tailwind CSS is properly configured
- Check that the build completed without errors

## Local Testing

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The static files will be in the 'out' directory
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS records with your domain provider
3. Enable "Enforce HTTPS" in repository settings

## Monitoring

Monitor your deployments:
- Check the Actions tab for deployment status
- View deployment history in the Environments section
- Set up email notifications for failed deployments in Settings > Notifications
