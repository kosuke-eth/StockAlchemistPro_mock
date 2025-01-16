import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BarChart2, PieChart, Users } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';
import { useAuth } from '../context/AuthContext';

export const Reports: React.FC = () => {
  const { orders } = useMockData();
  const { user } = useAuth();
  const [reportType, setReportType] = useState('sales');
  const [timeRange, setTimeRange] = useState('30');

  // ログインしていない場合、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your reports and analysis seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const reports = [
    {
      id: 'sales',
      name: 'Sales Report',
      icon: BarChart2,
      description: 'View detailed sales performance across all channels',
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      icon: PieChart,
      description: 'Track stock levels and movement patterns',
    },
    {
      id: 'customers',
      name: 'Customer Analysis',
      icon: Users,
      description: 'Analyze customer behavior and demographics',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analysis</h1>
        <div className="flex space-x-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            <Calendar className="h-5 w-5 mr-2" />
            Custom Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setReportType(report.id)}
              className={`p-6 rounded-lg text-left transition-all ${
                reportType === report.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-900 shadow-sm hover:shadow-md'
              }`}
            >
              <Icon
                className={`h-8 w-8 ${
                  reportType === report.id ? 'text-white' : 'text-blue-600'
                }`}
              />
              <h3 className="mt-4 text-lg font-medium">{report.name}</h3>
              <p
                className={`mt-2 text-sm ${
                  reportType === report.id ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {report.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {reports.find((r) => r.id === reportType)?.name}
          </h2>
          <button className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            Export Report
          </button>
        </div>

        {reportType === 'sales' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-green-600">
                  +12.5% vs last period
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  {orders.length.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-green-600">
                  +8.3% vs last period
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Average Order Value</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  $
                  {(orders.reduce((sum, order) => sum + order.total, 0) /
                    orders.length).toFixed(2)}
                </div>
                <div className="mt-2 text-sm text-green-600">
                  +4.2% vs last period
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-sm font-medium text-gray-700 mb-4">
                Sales by Channel
              </div>
              <div className="space-y-4">
                {(['ec', 'sns', 'wholesale'] as const).map((channel) => {
                  const channelOrders = orders.filter(
                    (o) => o.channel === channel
                  );
                  const total = channelOrders.reduce(
                    (sum, order) => sum + order.total,
                    0
                  );
                  const percentage =
                    (channelOrders.length / orders.length) * 100;

                  return (
                    <div key={channel} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">
                          {channel.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          ${total.toLocaleString()} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            channel === 'ec'
                              ? 'bg-blue-600'
                              : channel === 'sns'
                              ? 'bg-purple-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {reportType === 'inventory' && (
          <div className="text-center text-gray-500 py-12">
            Inventory report visualization will be implemented here
          </div>
        )}

        {reportType === 'customers' && (
          <div className="text-center text-gray-500 py-12">
            Customer analysis visualization will be implemented here
          </div>
        )}
      </div>
    </div>
  );
};
