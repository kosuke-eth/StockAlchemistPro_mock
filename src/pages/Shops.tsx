import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Shops: React.FC = () => {
  const { user } = useAuth();

  // ログインしていない場合、Stock Alchemist の説明と大きめのログインボタンを表示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock Alchemist</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover our retail locations and partner stores, and manage your inventory seamlessly with Stock Alchemist.
        </p>
        <Link to="/login">
          <button className="px-8 py-4 text-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </Link>
      </div>
    );
  }

  const shops = [
    {
      id: '1',
      name: 'Downtown Fashion Hub',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
      address: '123 Main St, New York, NY',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      reviews: 128,
      type: 'Retail Store',
    },
    {
      id: '2',
      name: 'Tech Gadgets Store',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
      address: '456 Tech Ave, San Francisco, CA',
      phone: '+1 (555) 987-6543',
      rating: 4.6,
      reviews: 95,
      type: 'Electronics',
    },
    {
      id: '3',
      name: 'Lifestyle Boutique',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
      address: '789 Fashion St, Los Angeles, CA',
      phone: '+1 (555) 456-7890',
      rating: 4.9,
      reviews: 156,
      type: 'Boutique',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop Locations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Find our retail locations and partner stores.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Shop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div key={shop.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{shop.name}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {shop.type}
                </span>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {shop.address}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {shop.phone}
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {shop.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">·</span>
                  <span className="text-sm text-gray-500">
                    {shop.reviews} reviews
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  View Details
                </button>
                <button className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Store
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
