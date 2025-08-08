# Vercel Deployment Guide for SarkariJobsIndia

## Step-by-Step Deployment Process

### 1. Prepare Your GitHub Repository

First, you need to push your code to GitHub:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: SarkariJobsIndia portal ready for deployment"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/sarkari-jobs-india.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository "sarkari-jobs-india"

### 3. Configure Build Settings

Vercel will automatically detect the project. Use these settings:

- **Framework Preset**: Other
- **Root Directory**: Leave empty (use root)
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `cd client && npm install`

### 4. Environment Variables (Optional)

If you plan to add database integration later, add these in Vercel dashboard:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NODE_ENV` - Set to "production"

### 5. Deploy

Click "Deploy" and wait for the build to complete.

## Project Structure for Vercel

```
├── api/                     # Serverless functions
│   └── jobs/
│       ├── index.js        # GET /api/jobs, POST /api/jobs
│       └── [id].js         # GET /api/jobs/:id
├── client/                 # Frontend React app
│   ├── dist/              # Build output (generated)
│   ├── src/               # React source code
│   ├── package.json       # Frontend dependencies
│   └── ...
├── server/                # Original server (not used in Vercel)
├── shared/                # Shared TypeScript types
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## What's Configured

✅ **Serverless API Functions**: Jobs API endpoints work as Vercel functions
✅ **Static Frontend**: React app builds and serves from CDN
✅ **CORS**: Properly configured for cross-origin requests
✅ **Routing**: Frontend routing handled by Wouter
✅ **Mock Data**: Same 8 Indian government jobs available
✅ **Search & Filters**: All functionality preserved

## Expected URLs After Deployment

- **Website**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api/jobs`
- **Job Details**: `https://your-project-name.vercel.app/api/jobs/:id`

## Troubleshooting

If deployment fails:

1. **Build Issues**: Check that `cd client && npm run build` works locally
2. **API Issues**: Test API functions locally using Vercel CLI
3. **Dependencies**: Ensure all dependencies are in correct package.json files

## Testing Locally with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Run development server
vercel dev

# Build for production
vercel build
```

## Next Steps After Deployment

1. **Custom Domain**: Add your domain in Vercel dashboard
2. **Database**: Connect to real PostgreSQL database
3. **Authentication**: Add user login functionality
4. **Real Scraping**: Implement actual government website scraping
5. **SEO**: Add meta tags and sitemap