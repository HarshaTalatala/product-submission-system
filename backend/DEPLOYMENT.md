# Backend Deployment Instructions

## Deploy Backend to Vercel

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Configuration:**
   - Project Name: `product-submission-system-backend` (or your preferred name)
   - Root Directory: Keep as `./`
   - Build Settings: Use defaults (Vercel will detect Node.js)

4. **After Deployment:**
   - Copy your backend URL (e.g., `https://your-backend.vercel.app`)
   - You'll need this URL for the frontend deployment

## API Endpoints

Once deployed, your backend will expose:
- `GET /api/products` - Fetch all products
- `POST /api/products` - Submit a new product
- `POST /api/generate-questions` - Generate AI questions
- `GET /api/health` - Health check

## Environment Variables

No environment variables required for basic deployment.

## Testing

Test your deployed backend:
```bash
curl https://your-backend-url.vercel.app/api/health
```
