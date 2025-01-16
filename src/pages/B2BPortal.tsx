import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, DollarSign, Truck, ShoppingCart } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';

export const B2BPortal: React.FC = () => {
  const { products } = useMockData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // ログインしていない場合、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your inventory, orders, reports and more seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product =>
    (filterCategory === 'all' || product.category === filterCategory) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">B2B Wholesale Portal</h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse our wholesale catalog and place bulk orders
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Place Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    filterCategory === category
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Selected Items</span>
                <span className="font-medium text-gray-900">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Quantity</span>
                <span className="font-medium text-gray-900">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="pt-4 border-t">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Wholesale Price</span>
                      <span className="font-medium text-gray-900">
                        ${(product.price * 0.7).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">MOQ</span>
                      <span className="font-medium text-gray-900">50 units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available Stock</span>
                      <span className="font-medium text-gray-900">
                        {product.quantity} units
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="Qty"
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
