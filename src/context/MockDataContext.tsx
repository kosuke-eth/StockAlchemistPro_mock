import React, { createContext, useContext, useState } from 'react';
import { Product, Order, User } from '../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    sku: 'TS-001',
    price: 29.99,
    cost: 15.00,
    quantity: 150,
    threshold: 50,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Apparel',
  },
  {
    id: '2',
    name: 'Designer Hoodie',
    sku: 'HD-001',
    price: 59.99,
    cost: 30.00,
    quantity: 30,
    threshold: 40,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Apparel',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    sku: 'WE-001',
    price: 129.99,
    cost: 65.00,
    quantity: 75,
    threshold: 25,
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500',
    category: 'Electronics',
  },
];

const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    products: [
      { productId: '1', quantity: 2, price: 29.99 },
      { productId: '2', quantity: 1, price: 59.99 },
    ],
    status: 'processing',
    channel: 'ec',
    createdAt: '2024-03-15T10:00:00Z',
    total: 119.97,
  },
  {
    id: '2',
    userId: '2',
    products: [
      { productId: '3', quantity: 1, price: 129.99 },
    ],
    status: 'shipped',
    channel: 'sns',
    createdAt: '2024-03-14T15:30:00Z',
    total: 129.99,
  },
];

interface MockDataContextType {
  products: Product[];
  orders: Order[];
  updateProduct: (product: Product) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
  };

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const updateOrder = (order: Order) => {
    setOrders(orders.map(o => o.id === order.id ? order : o));
  };

  return (
    <MockDataContext.Provider value={{ products, orders, updateProduct, addOrder, updateOrder }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};