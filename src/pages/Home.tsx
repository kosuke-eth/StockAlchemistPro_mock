import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, FileText } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const { products, orders } = useMockData();

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

  const stats = [
    {
      title: 'Low Stock Items',
      value: products.filter(p => p.quantity < p.threshold).length,
      description: 'Products below threshold',
      icon: Package,
      color: 'text-red-600',
      link: '/inventory',
    },
    {
      title: 'Pending Orders',
      value: orders.filter(o => o.status === 'pending').length,
      description: 'Orders awaiting processing',
      icon: ShoppingCart,
      color: 'text-blue-600',
      link: '/order',
    },
    {
      title: 'Total Revenue',
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
      description: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-green-600',
      link: '/ranking',
    },
    {
      title: 'Active Products',
      value: products.length,
      description: 'Total products in catalog',
      icon: FileText,
      color: 'text-purple-600',
      link: '/inventory',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{stat.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                to={`/order/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      ${order.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{order.status}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.channel === 'ec'
                        ? 'bg-blue-100 text-blue-800'
                        : order.channel === 'sns'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.channel.toUpperCase()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            {products
              .filter((product) => product.quantity < product.threshold)
              .map((product) => (
                <Link
                  key={product.id}
                  to={`/inventory/${product.id}`}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-red-600">
                      {product.quantity} units left
                    </div>
                    <div className="text-sm text-gray-500">
                      Threshold: {product.threshold}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
