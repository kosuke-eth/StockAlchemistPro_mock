import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, Search, Filter } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';

export const Inventory: React.FC = () => {
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
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">In Stock</div>
                <div className="mt-1 font-medium text-gray-900">
                  {product.quantity} units
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Price</div>
                <div className="mt-1 font-medium text-gray-900">
                  ${product.price}
                </div>
              </div>
            </div>

            {product.quantity < product.threshold && (
              <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-medium">Low stock alert</span>
              </div>
            )}

            <div className="mt-4 flex justify-end space-x-3">
              <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                History
              </button>
              <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
