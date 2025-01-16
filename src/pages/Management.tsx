import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users, Globe, DollarSign, Shield, Bell, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Management: React.FC = () => {
  const { user } = useAuth();

  // ログインしていない場合、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your system settings, security, billing and more seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const settings = [
    {
      id: 'products',
      name: 'Product Management',
      icon: Package,
      description: 'Manage product details, pricing, and inventory settings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'users',
      name: 'User Management',
      icon: Users,
      description: 'Control user access and permissions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'localization',
      name: 'Localization',
      icon: Globe,
      description: 'Configure language and currency settings',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      icon: DollarSign,
      description: 'Manage payment methods and billing settings',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      description: 'Configure security settings and authentication',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Set up email and system notifications',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Management</h1>
        <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
          View System Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div
              key={setting.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className={`${setting.bgColor} p-3 w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${setting.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{setting.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{setting.description}</p>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                Configure →
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent System Activity</h2>
        <div className="space-y-4">
          {[
            {
              action: 'User permission updated',
              user: 'admin@example.com',
              timestamp: '2024-03-15T10:30:00Z',
              icon: Users,
              color: 'text-purple-600',
            },
            {
              action: 'System settings modified',
              user: 'system@example.com',
              timestamp: '2024-03-15T09:15:00Z',
              icon: Settings,
              color: 'text-blue-600',
            },
            {
              action: 'Security alert triggered',
              user: 'security@example.com',
              timestamp: '2024-03-15T08:45:00Z',
              icon: Shield,
              color: 'text-red-600',
            },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`${activity.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-500">{activity.user}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
