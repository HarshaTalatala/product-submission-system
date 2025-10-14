# Deployment Guide - Vercel GitHub Integration

## ✅ Prerequisites Completed
- ✅ Frontend build tested successfully
- ✅ Vercel configuration (`vercel.json`) optimized
- ✅ Build commands configured in `package.json`
- ✅ `.vercelignore` file added
- ✅ Changes committed and pushed to GitHub

## 🚀 Deploy with Vercel GitHub Integration

### Step 1: Sign in to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository
1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your repository: `HarshaTalatala/product-submission-system`
3. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect your settings, but verify:

**Framework Preset:** `Other` (or leave as auto-detected)

**Root Directory:** `./` (leave as root)

**Build Command:** 
```
cd frontend && npm install && npm run build
```

**Output Directory:** 
```
frontend/dist
```

**Install Command:**
```
npm install
```

### Step 4: Environment Variables (Optional)
If you need any environment variables:
- Click **"Environment Variables"**
- Add any required variables (none needed for basic deployment)

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a live URL like: `https://product-submission-system-xyz.vercel.app`

## 🎉 Post-Deployment

### Test Your Deployment
Once deployed, test these features:
- ✅ Frontend loads correctly
- ✅ Multi-step form works
- ✅ API endpoints respond (`/api/health`, `/api/products`, `/api/generate-questions`)
- ✅ Product submission works
- ✅ PDF generation works
- ✅ Product list displays

### Automatic Deployments
Every push to `main` branch will automatically trigger a new deployment! 🚀

### View Deployment Logs
- Go to your project dashboard on Vercel
- Click on any deployment
- View **"Building"** and **"Functions"** logs for debugging

## 🔧 Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Verify `frontend/package.json` has all dependencies
- Ensure TypeScript compiles without errors

### API Routes Not Working
- Verify `vercel.json` routes are correct
- Check that `backend/server.js` exports correctly
- View Function logs in Vercel dashboard

### 404 on Routes
- Ensure `vercel.json` has the catch-all route for SPA
- Verify `frontend/dist` is being generated

## 📝 Update README
After successful deployment, add your live URL to `README.md`:

```markdown
## 🌐 Live Demo
**Deployed Application:** https://your-app-url.vercel.app

## 🔗 Links
- **GitHub Repository:** https://github.com/HarshaTalatala/product-submission-system
- **Live Application:** https://your-app-url.vercel.app
```

## 🎯 Next Steps
1. Share your deployed URL with the Altibbe team
2. Test all features on the live site
3. Monitor deployment logs for any issues
4. Set up custom domain (optional)

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or deployment logs.
