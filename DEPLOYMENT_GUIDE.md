# 🚀 Deployment Guide - Separate Frontend & Backend

This guide will help you deploy your frontend and backend as **two separate Vercel projects**.

## 📋 Prerequisites

- Vercel account (logged in via `vercel login`)
- GitHub repository with your code

## 🎯 Deployment Strategy

Your application will be deployed as:
1. **Backend**: Separate Vercel serverless functions
2. **Frontend**: Separate static site with API integration

---

## 📦 Step 1: Deploy Backend

### 1.1 Navigate to Backend
```powershell
cd backend
```

### 1.2 Deploy to Vercel
```powershell
vercel --prod
```

### 1.3 Answer the prompts:
- **Set up and deploy?** → `yes`
- **Which scope?** → Choose your account
- **Link to existing project?** → `no`
- **Project name?** → `product-submission-backend` (or your choice)
- **In which directory?** → `./`
- **Override settings?** → `no`

### 1.4 Copy Backend URL
After deployment completes, you'll see:
```
✅ Production: https://product-submission-backend-xxx.vercel.app
```

**📝 SAVE THIS URL! You'll need it for the frontend.**

---

## 🎨 Step 2: Deploy Frontend

### 2.1 Navigate to Frontend
```powershell
cd ../frontend
```

### 2.2 Deploy to Vercel
```powershell
vercel --prod
```

### 2.3 Answer the prompts:
- **Set up and deploy?** → `yes`
- **Which scope?** → Choose your account
- **Link to existing project?** → `no`
- **Project name?** → `product-submission-frontend` (or your choice)
- **In which directory?** → `./`
- **Override settings?** → `no`

### 2.4 Add Environment Variable

After deployment, you need to connect frontend to backend:

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/dashboard
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.vercel.app/api`
   - **Environments**: Production, Preview, Development
5. Click **Save**
6. Go to **Deployments** tab
7. Click the three dots on latest deployment → **Redeploy**

**Option B: Via CLI**
```powershell
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.vercel.app/api
vercel --prod
```

---

## ✅ Step 3: Verify Deployment

### Test Backend:
```powershell
curl https://your-backend-url.vercel.app/api/health
```

### Test Frontend:
1. Visit your frontend URL
2. Try submitting a product
3. Check if it appears in the product list

---

## 🔧 Project Structure

```
Fullstack/
├── backend/                    → Deployed as: product-submission-backend
│   ├── server.js
│   ├── vercel.json            ✅ Backend config
│   └── DEPLOYMENT.md
│
└── frontend/                   → Deployed as: product-submission-frontend
    ├── src/
    ├── vercel.json            ✅ Frontend config
    ├── DEPLOYMENT.md
    └── .env.local             (for local development)
```

---

## 🌐 URLs After Deployment

- **Frontend**: `https://product-submission-frontend-xxx.vercel.app`
- **Backend API**: `https://product-submission-backend-xxx.vercel.app/api`

---

## 🔄 Redeploying After Changes

### Backend Changes:
```powershell
cd backend
vercel --prod
```

### Frontend Changes:
```powershell
cd frontend
vercel --prod
```

---

## 🐛 Troubleshooting

### Frontend shows "Failed to fetch"
- Check that `VITE_API_URL` is set correctly in Vercel dashboard
- Verify backend is deployed and accessible
- Check browser console for CORS errors

### Backend not responding
- Verify deployment was successful: `vercel ls`
- Check logs: Go to Vercel dashboard → Select project → View logs

### Environment variable not working
- Make sure to **redeploy** after adding environment variables
- Check variable name is exactly `VITE_API_URL` (case-sensitive)
- Verify value includes `/api` at the end

---

## 🔗 Connecting GitHub (Optional)

To enable automatic deployments on git push:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Git**
4. Connect your GitHub repository
5. Configure branch: `main` for production

Repeat for both frontend and backend projects.

---

## 📝 Quick Command Reference

```powershell
# Login to Vercel
vercel login

# Deploy backend (from project root)
cd backend
vercel --prod

# Deploy frontend (from project root)
cd frontend
vercel --prod

# Check deployments
vercel ls

# View logs
vercel logs <deployment-url>

# Remove .vercel folder (fresh start)
Remove-Item -Recurse -Force .vercel
```

---

## ✨ Success!

Both your frontend and backend are now deployed separately and working together! 🎉

**Next Steps:**
- Set up custom domains
- Configure automatic deployments via GitHub
- Add monitoring and analytics
- Set up environment variables for different environments
