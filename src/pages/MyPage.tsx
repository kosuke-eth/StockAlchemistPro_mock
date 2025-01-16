import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Bell, Key, Shield, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MyPage: React.FC = () => {
  const { user } = useAuth();

  // ログインしていない場合、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your inventory, orders, and system settings seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const sections = [
    {
      title: 'Account Settings',
      icon: Settings,
      items: [
        { label: 'Profile Information', icon: User },
        { label: 'Notification Preferences', icon: Bell },
        { label: 'Change Password', icon: Key },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', icon: Key },
        { label: 'Login History', icon: History },
        { label: 'Connected Devices', icon: Settings },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Icon className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <ItemIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              action: 'Password changed',
              timestamp: '2024-03-15T10:30:00Z',
              icon: Key,
            },
            {
              action: 'Login from new device',
              timestamp: '2024-03-14T15:45:00Z',
              icon: Shield,
            },
            {
              action: 'Profile updated',
              timestamp: '2024-03-13T09:15:00Z',
              icon: User,
            },
          ].map((activity, index) => {
            const ActivityIcon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <ActivityIcon className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
