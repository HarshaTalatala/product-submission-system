export interface Question {
  id: string;
  question: string;
  type: 'boolean' | 'text' | 'select';
  choices?: string[];
  placeholder?: string;
  description?: string;
}

export interface Product {
  id?: number;
  productName: string;
  productType: string;
  description: string;
  answers: Record<string, string>;
  submittedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
