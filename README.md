# Fullstack Product Submission (AI + PDF)

A React + Vite + TypeScript frontend and an Express backend that lets users submit products through a multi-step form, generates tailored (rule-based) AI questions per product type, stores submissions in memory, and exports a polished PDF report.

## 🌐 Live Demo

**Deployed Application:** [Coming Soon - Deploy via Vercel Dashboard]

**GitHub Repository:** https://github.com/HarshaTalatala/product-submission-system

> **Note:** After deploying via Vercel, update this section with your live URL!

## Setup

Prerequisites
- Node.js 18+ and npm
- Windows PowerShell (commands below use PowerShell)

Install dependencies (root, backend, frontend):
```powershell
# From repo root
npm run install:all
```

Start in development (runs backend on 5000 and frontend on 3000 with API proxy):
```powershell
npm run dev
```

Open the app:
- Frontend: http://localhost:3000
- API base: http://localhost:5000/api

Environment variables (optional)
- Backend: PORT (default 5000)
- Frontend: VITE_API_URL (defaults to "/api" and proxies to 5000 in dev via `vite.config.ts`)

Build frontend for production:
```powershell
cd frontend; npm run build
```

Run backend only (local):
```powershell
npm start
```
Note: The `start` script only launches the backend. For a full local production setup you’ll typically serve `frontend/dist` with a static server or deploy with Vercel (see `vercel.json`).

## Features

- Multi-step product form with progress UI
  - Step 1: Basic info (name, type, description)
  - Step 2: AI-generated questions based on product type
  - Step 3: Review and submit
- AI question generation (rule-based simulation)
  - Tailors questions for Food, Cosmetic, Electronics, Clothing, and Other
  - Adds metadata about generation for transparency
- Product storage (in-memory)
  - Fast demo-friendly API; data resets on server restart
- PDF export (jsPDF)
  - Clean, paginated report with headers/footers and Q&A cards
  - Filename format: <Product_Name>_Report.pdf
- Developer-friendly DX
  - Vite + React + TypeScript + Tailwind CSS
  - Express API with CORS enabled
  - Vercel routing (`vercel.json`) to serve API and frontend

## AI Service Documentation

The AI service is a rule-based simulator located at `backend/ai-service/generateQuestions.js`. It exposes utilities used by the backend route(s).

Primary route: Generate questions
- POST /api/generate-questions
- Body: `{ "productType": "Food" | "Cosmetic" | "Electronics" | "Clothing" | "Other" }`
- Response shape:
```json
{
  "success": true,
  "productType": "Food",
  "questions": {
    "questions": [
      {
        "id": "food_preservatives",
        "question": "Does this product contain any artificial preservatives or chemical additives?",
        "type": "boolean",
        "choices": ["Yes", "No"],
        "description": "Helps consumers identify products with natural ingredients"
      },
      { "id": "...", "question": "...", "type": "text|select|boolean", ... }
    ],
    "metadata": {
      "generatedAt": "2025-10-15T12:34:56.000Z",
      "productType": "Food",
      "questionCount": 7,
      "aiModel": "Rule-based simulation (v1.0)",
      "note": "In production, this would use GPT-4, Gemini, or custom ML models"
    }
  }
}
```

Available product types
- Food, Cosmetic, Electronics, Clothing, Other

Other API routes
- GET /api/health → `{ success, message, timestamp }`
- GET /api/products → `{ success, data: Product[], count }`
- POST /api/products → Save a product
  - Body (Product):
    ```json
    {
      "productName": "string",
      "productType": "string",
      "description": "string",
      "answers": { "question_id": "answer" }
    }
    ```
  - Response: `{ success, data: Product }` (with `id` and `submittedAt`)

Notes
- Storage is in-memory; restarting the server clears all products.
- The frontend’s `api.ts` uses `VITE_API_URL` or `/api` and Vite proxy to talk to the backend in dev.

## Sample Product Entry

You can submit this example via the UI or directly to the API.

Sample (Food):
```json
{
  "productName": "Organic Green Tea",
  "productType": "Food",
  "description": "Loose-leaf green tea sourced from certified organic farms; mild flavor with antioxidant benefits.",
  "answers": {
    "food_preservatives": "No",
    "food_organic": "Yes",
    "food_allergens": "None; processed in a facility that also handles tree nuts",
    "food_nutritional": "Rich in antioxidants; 0 calories per serving",
    "food_expiry": "6-12 months (Long Shelf Life)",
    "food_packaging": "Compostable Paper/Cardboard",
    "food_certifications": "USDA Organic, ISO 22000, HACCP"
  }
}
```

Example report
- From the Products list, click “Generate PDF” on the submitted product.
- Expected filename: `Organic_Green_Tea_Report.pdf`.
- Contents include:
  - Cover header with title and date
  - Product name, type, and description
  - Review section with numbered Q&A cards (labels derived from question IDs)
  - Footer with pagination

PowerShell API quick test
```powershell
# Health
Invoke-RestMethod -Method GET http://localhost:5000/api/health | ConvertTo-Json -Depth 5

# Generate questions
Invoke-RestMethod -Method POST http://localhost:5000/api/generate-questions -Body (@{ productType = "Food" } | ConvertTo-Json) -ContentType 'application/json' | ConvertTo-Json -Depth 6

# Submit sample product
$body = @{
  productName = "Organic Green Tea"
  productType = "Food"
  description = "Loose-leaf green tea sourced from certified organic farms; mild flavor with antioxidant benefits."
  answers = @{ 
    food_preservatives = "No"
    food_organic = "Yes"
    food_allergens = "None; processed in a facility that also handles tree nuts"
    food_nutritional = "Rich in antioxidants; 0 calories per serving"
    food_expiry = "6-12 months (Long Shelf Life)"
    food_packaging = "Compostable Paper/Cardboard"
    food_certifications = "USDA Organic, ISO 22000, HACCP"
  }
} | ConvertTo-Json
Invoke-RestMethod -Method POST http://localhost:5000/api/products -Body $body -ContentType 'application/json' | ConvertTo-Json -Depth 6
```

## Tech Stack

- Frontend: React 18, Vite, TypeScript, Tailwind CSS, jsPDF
- Backend: Node.js, Express, CORS
- Tooling: ESLint, Concurrently, Vercel routing

## 🚀 Deploy (Vercel GitHub Integration)

This project is configured for seamless deployment with Vercel's GitHub integration.

### Quick Deploy Steps:

1. **Push to GitHub** (Already done! ✅)
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import `HarshaTalatala/product-submission-system`

3. **Configure (Auto-detected)**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

4. **Deploy!**
   - Click "Deploy" and wait 2-3 minutes
   - Get your live URL: `https://product-submission-system-xyz.vercel.app`

### Automatic Deployments
Every push to `main` triggers automatic redeployment! 🎉

### Configuration Files
- `vercel.json` - Routes API calls to serverless functions and serves static frontend
- `.vercelignore` - Excludes unnecessary files from deployment
- `package.json` - Contains `vercel-build` script for deployment

**📖 Detailed deployment guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Reflection (~200 words)

How did you use AI tools in development?
I used AI to accelerate repetitive scaffolding and to draft domain-specific question sets per product type. Instead of calling a paid LLM in runtime, I encoded a clear, auditable rule-based generator that mirrors how an AI-driven flow would behave. AI also helped with UI copy, empty states, and PDF layout ideas. Crucially, I kept the implementation transparent: the logic is in source, versioned, and easy to tweak.

What principles guided your architecture, design, and product transparency logic?
I aimed for practical clarity: a simple Express API, a Vite React UI, and a seam (the AI service) that can later swap from rules to a real LLM. I favored explicit contracts (typed DTOs, predictable route shapes), fast iteration (in-memory storage, proxy-based dev), and user trust via transparency. The questions include descriptions to explain why we ask them; the PDF embeds dates and counts; and the UI shows progression and validation. These patterns make the product understandable, testable, and ready to evolve—without surprising users or developers.
