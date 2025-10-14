import { useState } from 'react';
import { api } from '../services/api';
import { Question, Product } from '../types';

interface ProductFormProps {
  onSuccess: () => void;
}

const PRODUCT_TYPES = ['Food', 'Cosmetic', 'Electronics', 'Clothing', 'Other'];

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Step 1: Basic Information
  const handleStep1Next = async () => {
    if (!productName || !productType || !description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call AI service to generate questions
      const response = await api.generateQuestions(productType);
      
      if (response.success && response.questions) {
        setQuestions(response.questions.questions);
        setCurrentStep(2);
      } else {
        setError('Failed to generate questions');
      }
    } catch (err) {
      setError('Error connecting to AI service');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Dynamic Questions
  const handleStep2Next = () => {
    // Check if all questions are answered
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      setError('Please answer all questions');
      return;
    }
    setError(null);
    setCurrentStep(3);
  };

  // Step 3: Review & Submit
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const productData: Product = {
      productName,
      productType,
      description,
      answers,
    };

    try {
      const response = await api.submitProduct(productData);
      
      if (response.success) {
        // Reset form
        setProductName('');
        setProductType('');
        setDescription('');
        setAnswers({});
        setQuestions([]);
        setCurrentStep(1);
        
        // Navigate to product list
        onSuccess();
      } else {
        setError('Failed to submit product');
      }
    } catch (err) {
      setError('Error submitting product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center" style={{ flex: step < 3 ? '1' : '0' }}>
              <div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 flex-shrink-0 ${
                  currentStep >= step
                    ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
                {currentStep >= step && (
                  <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></div>
                )}
              </div>
              {step < 3 && (
                <div className="flex-1 h-2 mx-3 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentStep > step ? 'bg-gradient-to-r from-primary-500 to-primary-700 w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm font-semibold px-1">
          <span className={currentStep >= 1 ? 'text-primary-600' : 'text-gray-500'}>📋 Basic Info</span>
          <span className={currentStep >= 2 ? 'text-primary-600' : 'text-gray-500'}>🤖 AI Questions</span>
          <span className={currentStep >= 3 ? 'text-primary-600' : 'text-gray-500'}>✓ Review</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-800 shadow-md animate-slideUp flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Step Content */}
      <div className="card p-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Basic Product Information
                </h2>
                <p className="text-gray-500 text-sm mt-1">Tell us about your product</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Organic Green Tea"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                  Product Type *
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select a type</option>
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                  Product Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Provide a detailed description of your product..."
                />
                <p className="text-xs text-gray-500 mt-1">{description.length} characters</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleStep1Next}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Questions...
                  </>
                ) : (
                  <>
                    Next: AI Questions
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Dynamic AI Questions */}
        {currentStep === 2 && (
          <div className="animate-slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  AI-Generated Questions
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Tailored for <span className="font-semibold text-purple-600">{productType}</span> products
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="mb-4">
                    <label className="flex items-start gap-3 text-base font-bold text-gray-900 mb-2">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                        {index + 1}
                      </span>
                      <span className="mt-0.5">{question.question}</span>
                    </label>
                    {question.description && (
                      <div className="ml-11 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="leading-relaxed">{question.description}</span>
                      </div>
                    )}
                  </div>

                  <div className="ml-11">
                    {question.type === 'boolean' && question.choices && (
                      <div className="flex gap-3">
                        {question.choices.map((choice) => (
                          <button
                            key={choice}
                            onClick={() =>
                              setAnswers({ ...answers, [question.id]: choice })
                            }
                            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                              answers[question.id] === choice
                                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/50 scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === 'text' && (
                      <input
                        type="text"
                        value={answers[question.id] || ''}
                        onChange={(e) =>
                          setAnswers({ ...answers, [question.id]: e.target.value })
                        }
                        className="input-field"
                        placeholder={question.placeholder || 'Enter your answer'}
                      />
                    )}

                    {question.type === 'select' && question.choices && (
                      <select
                        value={answers[question.id] || ''}
                        onChange={(e) =>
                          setAnswers({ ...answers, [question.id]: e.target.value })
                        }
                        className="input-field"
                      >
                        <option value="">Select an option</option>
                        {question.choices.map((choice) => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between gap-4">
              <button onClick={handleBack} className="btn-secondary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back
              </button>
              <button onClick={handleStep2Next} className="btn-primary flex items-center gap-2">
                Next: Review
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="animate-slideUp">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Review Your Submission
                </h2>
                <p className="text-gray-500 text-sm mt-1">Please verify all information before submitting</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-bold text-lg text-gray-900">
                    Basic Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/60 p-4 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Name</p>
                    <p className="text-base font-semibold text-gray-900">{productName}</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Type</p>
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                      {productType}
                    </span>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</p>
                    <p className="text-sm text-gray-900 leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>

              {/* Answers */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <h3 className="font-bold text-lg text-gray-900">
                    Your Answers ({questions.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-white/60 p-4 rounded-xl">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Question {index + 1}
                      </p>
                      <p className="font-medium text-gray-800 mb-2">
                        {question.question}
                      </p>
                      <p className="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg inline-block">
                        ✓ {answers[question.id]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between gap-4">
              <button onClick={handleBack} className="btn-secondary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Product
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
