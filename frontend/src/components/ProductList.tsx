import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      if (response.success) {
        setProducts(response.data || []);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = (product: Product) => {
    generatePDF(product);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button onClick={fetchProducts} className="btn-primary">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
            <svg
              className="h-12 w-12 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Products Yet
          </h3>
          <p className="text-gray-600 text-lg">
            Submit your first product to see it here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Submitted Products
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              {products.length} {products.length !== 1 ? 'Products' : 'Product'}
            </span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-600 text-sm">Successfully submitted</span>
          </div>
        </div>
        <button onClick={fetchProducts} className="btn-secondary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Product Header */}
            <div className="mb-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {product.productName}
                  </h3>
                </div>
                <span className="ml-3 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                  {product.productType}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">
                  {Object.keys(product.answers || {}).length} <span className="text-gray-500 font-normal">answers</span>
                </span>
              </div>

              {/* Submission Date */}
              {product.submittedAt && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(product.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </div>

            {/* Actions */}
            <button
              onClick={() => handleGeneratePDF(product)}
              className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generate PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
