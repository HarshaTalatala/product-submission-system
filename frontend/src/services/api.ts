// Use environment variable for API URL, fallback to relative path for same-domain deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Fetch all products
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // Submit a new product
  async submitProduct(productData: any) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to submit product');
    }
    return response.json();
  },

  // Generate questions based on product type
  async generateQuestions(productType: string) {
    const response = await fetch(`${API_BASE_URL}/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productType }),
    });
    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }
    return response.json();
  },
};
