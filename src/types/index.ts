// Common Types
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user' | 'influencer';
  email: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  quantity: number;
  threshold: number;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  channel: 'sns' | 'ec' | 'wholesale';
  createdAt: string;
  total: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}