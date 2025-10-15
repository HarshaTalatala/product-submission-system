# 📋 Deployment Checklist

Use this checklist to ensure successful deployment of both frontend and backend.

## ✅ Pre-Deployment Checklist

- [ ] Code is committed and pushed to GitHub
- [ ] Vercel CLI is installed (`vercel --version`)
- [ ] Logged into Vercel (`vercel login`)
- [ ] No `.vercel` folders in backend/ or frontend/ directories

## 🔧 Backend Deployment

- [ ] Navigate to `backend/` directory
- [ ] Run `vercel --prod`
- [ ] Answer prompts:
  - [ ] Project name: `product-submission-backend` (or your choice)
  - [ ] Root directory: `./`
  - [ ] Override settings: `no`
- [ ] **SAVE BACKEND URL**: ___________________________________________
- [ ] Test backend: Visit `https://your-backend-url.vercel.app/api/health`
- [ ] Verify response: `{"success": true, "message": "Server is running", ...}`

## 🎨 Frontend Deployment

- [ ] Navigate to `frontend/` directory
- [ ] Run `vercel --prod`
- [ ] Answer prompts:
  - [ ] Project name: `product-submission-frontend` (or your choice)
  - [ ] Root directory: `./`
  - [ ] Override settings: `no`
- [ ] **SAVE FRONTEND URL**: ___________________________________________

## 🔗 Connect Frontend to Backend

### Via Vercel Dashboard:
- [ ] Go to https://vercel.com/dashboard
- [ ] Click on your **frontend project**
- [ ] Navigate to: **Settings** → **Environment Variables**
- [ ] Click **Add New**
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: `https://your-backend-url.vercel.app/api`
  - [ ] Environments: Check all (Production, Preview, Development)
- [ ] Click **Save**
- [ ] Go to **Deployments** tab
- [ ] Click "..." on latest deployment → **Redeploy** → **Redeploy**

### Via CLI (Alternative):
```powershell
cd frontend
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.vercel.app/api
vercel --prod
```

## ✅ Post-Deployment Testing

### Backend Tests:
- [ ] Health check: `curl https://your-backend-url.vercel.app/api/health`
- [ ] Generate questions: 
  ```powershell
  Invoke-RestMethod -Method POST https://your-backend-url.vercel.app/api/generate-questions `
    -Body (@{ productType = "Food" } | ConvertTo-Json) `
    -ContentType 'application/json'
  ```

### Frontend Tests:
- [ ] Visit frontend URL
- [ ] Page loads without errors
- [ ] Start form - Enter product name, type, description
- [ ] Click "Next" - AI questions load
- [ ] Fill out questions
- [ ] Click "Next" - Review page shows all data
- [ ] Click "Submit" - Success message appears
- [ ] Click "View Products" - Submitted product appears in list
- [ ] Click "Generate PDF" - PDF downloads with correct data

### Integration Tests:
- [ ] Network tab shows API calls to backend URL
- [ ] No CORS errors in console
- [ ] Data persists between page refreshes (until backend restarts)

## 🎉 Success Indicators

✅ Backend URL responds with `200 OK`  
✅ Frontend loads without console errors  
✅ API calls successfully reach backend  
✅ Products can be submitted and retrieved  
✅ PDF generation works correctly  

## 🐛 Troubleshooting

### "Failed to fetch" errors:
1. Check environment variable `VITE_API_URL` is set correctly
2. Verify backend URL is accessible
3. Ensure `/api` is included at end of backend URL

### 404 errors on frontend:
1. Check build completed successfully
2. Verify `dist/` folder was created
3. Check `vercel.json` routing configuration

### Environment variable not working:
1. Double-check spelling: `VITE_API_URL` (exact case)
2. Make sure to **redeploy** after adding variable
3. Clear browser cache and hard refresh

## 📝 Deployment URLs

**Backend:** _______________________________________________

**Frontend:** ______________________________________________

**Deployment Date:** ____________________________

**Deployed By:** ____________________________

---

## 🔄 Future Deployments

### Update Backend:
```powershell
cd backend
vercel --prod
```

### Update Frontend:
```powershell
cd frontend
vercel --prod
```

### Automatic Deployments:
Connect GitHub repository to Vercel projects for auto-deploy on push!

---

**Need help?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
