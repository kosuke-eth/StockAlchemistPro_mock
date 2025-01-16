import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';

export const Rankings: React.FC = () => {
  const { products, orders } = useMockData();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30');

  // ログインしていない場合は、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your sales, revenue, and product performance seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  // Calculate product rankings
  const productRankings = products
    .map(product => {
      const sales = orders.reduce((total, order) => {
        const productOrder = order.products.find(p => p.productId === product.id);
        return total + (productOrder ? productOrder.quantity : 0);
      }, 0);

      const revenue = orders.reduce((total, order) => {
        const productOrder = order.products.find(p => p.productId === product.id);
        return total + (productOrder ? productOrder.quantity * productOrder.price : 0);
      }, 0);

      return {
        ...product,
        sales,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Rankings</h1>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products by Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Top Products by Revenue</h2>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            {productRankings.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-gray-500">
                  #{index + 1}
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.sales} units sold
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Category Performance</h2>
          <div className="space-y-4">
            {Array.from(new Set(products.map(p => p.category))).map((category) => {
              const categoryProducts = productRankings.filter(p => p.category === category);
              const totalRevenue = categoryProducts.reduce((sum, p) => sum + p.revenue, 0);
              const totalSales = categoryProducts.reduce((sum, p) => sum + p.sales, 0);
              // モック用の成長指標（ランダム）
              const growth = Math.random() > 0.5;

              return (
                <div
                  key={category}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{category}</h3>
                    {growth ? (
                      <div className="flex items-center text-green-600">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm ml-1">+{Math.floor(Math.random() * 20 + 5)}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <ArrowDown className="h-4 w-4" />
                        <span className="text-sm ml-1">-{Math.floor(Math.random() * 10 + 1)}%</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Revenue</div>
                      <div className="font-medium text-gray-900">
                        ${totalRevenue.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Units Sold</div>
                      <div className="font-medium text-gray-900">
                        {totalSales.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
