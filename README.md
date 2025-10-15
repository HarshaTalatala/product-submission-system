# Product Transparency System

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

> A full-stack web application that collects detailed product information through intelligent, dynamic follow-up questions and generates comprehensive Product Transparency Reports.

**Built with Health, Wisdom, and Virtue in mind** — Empowering ethical, health-first decision-making through transparency.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [AI Service Documentation](#ai-service-documentation)
- [Sample Product Entry](#sample-product-entry)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Reflection](#reflection)
- [Future Enhancements](#future-enhancements)

---

## Overview

The Product Transparency System is designed to help companies provide comprehensive, transparent information about their products. By leveraging intelligent question generation and structured data collection, this platform builds trust with consumers who want to make informed, ethical purchasing decisions.

---

## Features

### Core Functionality

- **Multi-Step Dynamic Form**
  - Step 1: Basic product information (name, type, description)
  - Step 2: AI-generated contextual questions based on product type
  - Step 3: Review and submit with validation

- **Intelligent Question Generation**
  - Context-aware questions tailored to product categories
  - Support for Food, Cosmetics, Electronics, Clothing, and general products
  - Different question types: boolean, text input, dropdown selection

- **Product Management**
  - View all submitted products in an organized list
  - Search and filter capabilities
  - Detailed product information display

- **PDF Report Generation**
  - Professional, formatted PDF reports
  - Complete product transparency breakdown
  - Downloadable and shareable format
  - Includes submission metadata and timestamps

- **Responsive UI/UX**
  - Clean, modern gradient design
  - Mobile-responsive layout
  - Smooth animations and transitions
  - Loading states and error handling
  - Accessibility considerations

### Product Categories Supported

1. **Food Products**
   - Preservatives and additives disclosure
   - Organic certification status
   - Allergen information
   - Nutritional highlights
   - Shelf life and storage
   - Packaging sustainability
   - Quality certifications

2. **Cosmetic Products**
   - Cruelty-free certification
   - Paraben and sulfate content
   - Vegan status
   - Active ingredients
   - Skin type compatibility
   - Expiration information
   - Safety certifications

3. **Electronics**
   - Energy efficiency ratings
   - Battery information and disposal
   - Recycling programs
   - Warranty details
   - Material composition
   - Environmental certifications

4. **Clothing**
   - Fabric composition
   - Ethical manufacturing
   - Care instructions
   - Sizing standards
   - Durability information

5. **Other Products**
   - Recyclability
   - Ethical sourcing
   - Material composition
   - Durability rating
   - Sustainability initiatives
   - Warranty information

---

## Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library
- **TypeScript 5.2.2** - Type-safe development
- **Vite 5.0.8** - Fast build tool and dev server
- **Tailwind CSS 3.3.6** - Utility-first styling
- **jsPDF 2.5.1** - Client-side PDF generation

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web application framework
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript module system

### Development Tools
- **TypeScript ESLint** - Code quality
- **Nodemon** - Auto-restart development server
- **Concurrently** - Run multiple commands

### Deployment
- **Vercel** - Serverless deployment platform
- Frontend and Backend deployed separately
- Automatic deployments from Git

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/HarshaTalatala/product-submission-system.git
cd product-submission-system
```

#### 2. Install Dependencies

**Option A: Install all dependencies at once (Recommended)**
```bash
npm run install:all
```

**Option B: Install separately**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Run the Application

**Option A: Run both frontend and backend concurrently**
```bash
# From the root directory
npm run dev
```

**Option B: Run separately in different terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

#### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### Environment Configuration

Currently, the application uses default configurations. For production, you may want to add environment variables:

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
# Add database connection strings when implementing persistent storage
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

### Build for Production

**Frontend**:
```bash
cd frontend
npm run build
```

**Backend**:
```bash
cd backend
npm start
```

---

## AI Service Documentation

### Architecture

The AI service is implemented as a modular microservice located in `backend/ai-service/generateQuestions.js`. It provides intelligent, context-aware question generation based on product categories.

### Current Implementation

**Type**: Rule-based intelligent system with extensible architecture

The current implementation uses a sophisticated rule-based approach that:
- Maps product types to curated question sets
- Provides category-specific questions with validation
- Returns structured question objects with metadata
- Supports multiple question types (boolean, text, select)

### API Endpoint

#### POST `/api/generate-questions`

Generates dynamic questions based on product type.

**Request Body**:
```json
{
  "productType": "Food"
}
```

**Response**:
```json
{
  "success": true,
  "productType": "Food",
  "questions": {
    "questions": [
      {
        "id": "food_preservatives",
        "question": "Does this product contain any artificial preservatives?",
        "type": "boolean",
        "choices": ["Yes", "No"],
        "description": "Helps consumers identify products with natural ingredients"
      }
    ],
    "metadata": {
      "generatedAt": "2025-10-15T10:30:00.000Z",
      "productType": "Food",
      "questionCount": 7,
      "aiModel": "Rule-based simulation (v1.0)",
      "note": "In production, this would use GPT-4, Gemini, or custom ML models"
    }
  }
}
```

### Question Database Structure

Each product type has a curated set of questions stored in the question database:

```javascript
{
  id: 'unique_identifier',
  question: 'Question text displayed to user',
  type: 'boolean' | 'text' | 'select',
  choices: ['Option 1', 'Option 2'], // for boolean/select types
  placeholder: 'Hint text', // for text input
  description: 'Why this question matters'
}
```

### Supported Question Types

1. **Boolean Questions**
   - Simple Yes/No answers
   - Used for certifications, compliance, binary choices
   - Example: "Is this product organic?"

2. **Text Input Questions**
   - Free-form text responses
   - Used for detailed information, lists, descriptions
   - Example: "List all allergens present"

3. **Select/Dropdown Questions**
   - Predefined options for structured data
   - Used for categories, ratings, standards
   - Example: "What is the shelf life?"

### Advanced Features

The service includes a `generateFollowUpQuestions()` function for contextual follow-ups:

```javascript
// Example: If user indicates preservatives are present
if (answers.food_preservatives === 'Yes') {
  // Generate follow-up: "Which preservatives does it contain?"
}
```

### Future AI/ML Integration

The architecture is designed to easily integrate with actual AI/ML services:

#### Recommended Integrations:

**1. OpenAI GPT-4**
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateQuestions(productType, productDescription) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "You are a product transparency expert. Generate relevant questions..."
    }, {
      role: "user",
      content: `Product type: ${productType}\nDescription: ${productDescription}`
    }]
  });
  
  return parseAIResponse(completion.choices[0].message.content);
}
```

**2. Google Gemini**
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuestions(productType) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Generate transparency questions for ${productType}...`;
  const result = await model.generateContent(prompt);
  return parseGeminiResponse(result.response.text());
}
```

**3. Custom ML Model (Flask/FastAPI)**
```javascript
export async function generateQuestions(productType) {
  const response = await fetch('http://ml-service:5001/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productType, context: {...} })
  });
  return await response.json();
}
```

### Transparency Scoring (Future Feature)

Planned endpoint: `POST /api/transparency-score`

Will analyze submitted product data and provide:
- Overall transparency score (0-100)
- Category-specific ratings
- Recommendations for improvement
- Comparison with industry standards

---

## Sample Product Entry

### Example: Organic Almond Butter

#### Step 1: Basic Information
```json
{
  "productName": "Smooth Organic Almond Butter",
  "productType": "Food",
  "description": "100% organic roasted almonds, no additives. Rich in protein and healthy fats, perfect for toast or smoothies."
}
```

#### Step 2: AI-Generated Questions & Answers
```json
{
  "food_preservatives": "No",
  "food_organic": "Yes",
  "food_allergens": "Contains: Tree nuts (Almonds). May contain traces of: Peanuts, Other tree nuts",
  "food_nutritional": "High in protein (7g per serving), Rich in Vitamin E, Good source of healthy fats, Low in sugar",
  "food_expiry": "6-12 months (Long Shelf Life)",
  "food_packaging": "Glass (Reusable)",
  "food_certifications": "USDA Organic, Non-GMO Project Verified, Kosher"
}
```

#### Step 3: Generated Report Preview

The system generates a professional PDF report containing:

**Header Section**
- Product name in large, bold text
- Product type badge
- Submission date

**Product Details**
- Full description
- Category classification

**Transparency Information**
- All questions with formatted answers
- Clear sections for allergens, certifications, sustainability
- Visual indicators for Yes/No responses

**Footer**
- Generation timestamp
- Report ID
- System information

### Example Report Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              PRODUCT REPORT
              October 15, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUCT NAME
Smooth Organic Almond Butter

PRODUCT TYPE
Food

DESCRIPTION
100% organic roasted almonds, no additives. Rich in 
protein and healthy fats, perfect for toast or smoothies.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT TRANSPARENCY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARTIFICIAL PRESERVATIVES OR CHEMICAL ADDITIVES
✗ No

CERTIFIED ORGANIC
✓ Yes

POTENTIAL ALLERGENS
Contains: Tree nuts (Almonds). May contain traces of: 
Peanuts, Other tree nuts

KEY NUTRITIONAL HIGHLIGHTS
High in protein (7g per serving), Rich in Vitamin E, 
Good source of healthy fats, Low in sugar

SHELF LIFE
6-12 months (Long Shelf Life)

PACKAGING TYPE
Glass (Reusable)

QUALITY CERTIFICATIONS
USDA Organic, Non-GMO Project Verified, Kosher

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by Product Transparency System
Report ID: #1 | October 15, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Project Structure

```
product-submission-system/
├── frontend/                    # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ProductForm.tsx    # Multi-step form component
│   │   │   └── ProductList.tsx    # Product listing & management
│   │   ├── services/           # API integration
│   │   │   └── api.ts             # HTTP client & API calls
│   │   ├── types/              # TypeScript interfaces
│   │   │   └── index.ts           # Shared type definitions
│   │   ├── utils/              # Utility functions
│   │   │   ├── pdfGenerator.ts    # PDF generation logic
│   │   │   └── mockData.ts        # Sample data for testing
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # Application entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── vite.config.ts          # Vite build configuration
│   └── vercel.json             # Vercel deployment config
│
├── backend/                     # Node.js + Express Backend
│   ├── ai-service/             # AI/ML microservice
│   │   └── generateQuestions.js   # Question generation logic
│   ├── server.js               # Express server & API routes
│   ├── package.json            # Backend dependencies
│   └── vercel.json             # Vercel serverless config
│
├── package.json                # Root package.json (scripts)
├── LICENSE                     # MIT License
└── README.md                   # This file
```

### Key Files Explained

**Frontend**
- `App.tsx` - Main layout, navigation between form and list views
- `ProductForm.tsx` - Multi-step form logic, validation, API integration
- `ProductList.tsx` - Display products, view details, download PDFs
- `api.ts` - Centralized API client with error handling
- `pdfGenerator.ts` - PDF creation using jsPDF library

**Backend**
- `server.js` - Express routes, CORS, middleware, in-memory storage
- `generateQuestions.js` - Question database, AI service logic

---

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: Your deployed Vercel backend URL

### Endpoints

#### 1. Health Check
```
GET /api/health
```

**Response**:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-15T10:30:00.000Z"
}
```

---

#### 2. Get All Products
```
GET /api/products
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productName": "Smooth Organic Almond Butter",
      "productType": "Food",
      "description": "100% organic roasted almonds...",
      "answers": {...},
      "submittedAt": "2025-10-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

#### 3. Submit Product
```
POST /api/products
```

**Request Body**:
```json
{
  "productName": "Product Name",
  "productType": "Food",
  "description": "Product description...",
  "answers": {
    "food_preservatives": "No",
    "food_organic": "Yes",
    ...
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Product submitted successfully",
  "data": {
    "id": 1,
    "productName": "Product Name",
    ...
    "submittedAt": "2025-10-15T10:30:00.000Z"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Product name and type are required"
}
```

---

#### 4. Generate Questions
```
POST /api/generate-questions
```

**Request Body**:
```json
{
  "productType": "Food"
}
```

**Response**: See [AI Service Documentation](#ai-service-documentation)

---

## Deployment

### Vercel Deployment (Recommended)

This project is configured for seamless Vercel deployment.

#### Deploy Frontend

1. **Via Vercel Dashboard**:
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Via Vercel CLI**:
```bash
cd frontend
vercel --prod
```

#### Deploy Backend

1. **Via Vercel Dashboard**:
   - Import the same repository (or create new project)
   - Set root directory to `backend`
   - Framework preset: Other
   - No build command needed (serverless functions)

2. **Via Vercel CLI**:
```bash
cd backend
vercel --prod
```

#### Environment Variables

After deployment, update the frontend API URL:

**Frontend Environment Variable**:
```
VITE_API_URL=https://your-backend.vercel.app
```

Update in `frontend/src/services/api.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### Alternative Deployment Options

**Frontend**:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

**Backend**:
- Heroku
- AWS EC2/Lambda
- Google Cloud Run
- DigitalOcean

---

## Reflection

### How AI Tools Were Used in Development

Throughout this project, AI-powered development tools played a crucial role in accelerating development and ensuring code quality:

**GitHub Copilot** was instrumental in generating boilerplate code, particularly for TypeScript interfaces and React component structures. It helped write repetitive API endpoint handlers and reduced the time spent on common patterns. The AI suggestions for Tailwind CSS classes significantly sped up UI development.

**AI-Assisted Code Review** helped identify potential bugs, suggest performance optimizations, and maintain consistent coding standards across the codebase. It was particularly valuable for TypeScript type definitions and ensuring proper error handling.

**Problem-Solving with AI** - When encountering complex issues like PDF generation formatting or multi-step form state management, AI tools provided alternative approaches and best practices that I might not have considered, leading to more elegant solutions.

The AI service architecture itself was designed with extensibility in mind, making it straightforward to swap the rule-based logic with actual LLM APIs like GPT-4 or Gemini in the future.

### Guiding Principles

**Architecture**: The project follows a modular, separation-of-concerns approach. The frontend is completely decoupled from the backend through a RESTful API, and the AI service is isolated as a separate module. This makes it easy to scale, test, and replace components independently. TypeScript ensures type safety and catches errors early in development.

**Design**: User experience was paramount. The multi-step form prevents overwhelming users with too many questions at once. Progressive disclosure through dynamic question generation keeps the interface clean. Visual feedback (loading states, animations, success messages) builds trust and guides users through the process.

**Product Transparency Logic**: Questions were carefully curated to align with Altibbe's mission of Health, Wisdom, and Virtue. Each question serves a purpose: protecting consumer health (allergens, ingredients), promoting informed decisions (certifications, sourcing), and encouraging ethical practices (sustainability, fair trade). The system prioritizes actionable information over vanity metrics.

**Ethical Considerations**: The transparency focus extends to our own system - users know exactly what data is collected and why. The PDF reports are comprehensive yet digestible, empowering consumers without overwhelming them.

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Developer**: Harsha Vardhan Reddy Talatala

- GitHub: [@HarshaTalatala](https://github.com/HarshaTalatala)
- Repository: [product-submission-system](https://github.com/HarshaTalatala/product-submission-system)
- Email: harsha.talatala@gmail.com

---

<div align="center">

**Built with ❤️ for Health, Wisdom, and Virtue**

*Making product transparency accessible to everyone*

</div>
