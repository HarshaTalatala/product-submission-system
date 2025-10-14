import express from 'express';
import cors from 'cors';
import { generateQuestions } from './ai-service/generateQuestions.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for products
let products = [];
let productIdCounter = 1;

// Routes

/**
 * GET /api/products
 * Fetch all submitted products
 */
app.get('/api/products', (req, res) => {
  try {
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

/**
 * POST /api/products
 * Save a new product submission
 */
app.post('/api/products', (req, res) => {
  try {
    const productData = req.body;
    
    // Validate required fields
    if (!productData.productName || !productData.productType) {
      return res.status(400).json({
        success: false,
        message: 'Product name and type are required'
      });
    }

    // Create new product with ID and timestamp
    const newProduct = {
      id: productIdCounter++,
      ...productData,
      submittedAt: new Date().toISOString()
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product submitted successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save product',
      error: error.message
    });
  }
});

/**
 * POST /api/generate-questions
 * Generate dynamic questions based on product type using AI service
 */
app.post('/api/generate-questions', (req, res) => {
  try {
    const { productType } = req.body;

    if (!productType) {
      return res.status(400).json({
        success: false,
        message: 'Product type is required'
      });
    }

    // Call AI service to generate questions
    const questions = generateQuestions(productType);

    res.json({
      success: true,
      productType,
      questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate questions',
      error: error.message
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
