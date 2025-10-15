# Frontend Deployment Instructions

## Deploy Frontend to Vercel

### Step 1: Deploy Backend First
Make sure your backend is deployed first and you have the backend URL.

### Step 2: Configure Environment Variable

1. **In Vercel Dashboard (Recommended):**
   - Go to your frontend project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
   - Save and redeploy

2. **Or via CLI during deployment:**
   ```bash
   cd frontend
   vercel --prod
   ```

### Step 3: Deploy Frontend

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Configuration:**
   - Project Name: `product-submission-system-frontend` (or your preferred name)
   - Root Directory: Keep as `./`
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 4: Add Environment Variable (in Vercel Dashboard)

After first deployment:
1. Go to Project Settings → Environment Variables
2. Add: 
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.vercel.app/api`
3. Redeploy the project

## Testing

1. Visit your frontend URL
2. Try submitting a product
3. Check if data is being saved (view in product list)

## Updating Backend URL

If you change the backend URL, update the `VITE_API_URL` environment variable in Vercel dashboard and redeploy.
