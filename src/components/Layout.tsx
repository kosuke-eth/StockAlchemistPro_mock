import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  FileText,
  Settings,
  Store,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/home' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Orders', path: '/order' },
    { icon: BarChart2, label: 'Rankings', path: '/ranking' },
    { icon: FileText, label: 'Reports', path: '/report' },
    { icon: Settings, label: 'Management', path: '/management' },
    { icon: Store, label: 'B2B Portal', path: '/b2b' },
    { icon: Store, label: 'Shops', path: '/shops' },
  ];

  // Sidebarの共通部分（モバイル/デスクトップ共通）
  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Menu className="h-6 w-6 text-blue-600" />
        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Stock Alchemist Pro
        </span>
      </div>
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsSidebarOpen(false)} // モバイルの場合、リンククリックでサイドバーを閉じる
            >
              <Icon className="h-5 w-5" />
              <span className="ml-3 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* モバイル用サイドバー */}
      <div className="md:hidden">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 flex"
            onClick={() => setIsSidebarOpen(false)}
          >
            {/* 背景のオーバーレイ */}
            <div className="fixed inset-0 bg-black opacity-50" />
            {/* サイドバー本体 */}
            <div
              className="relative z-40 w-64 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()} // クリックイベントのバブリング防止
            >
              {sidebarContent}
            </div>
          </div>
        )}
      </div>

      {/* デスクトップ用サイドバー */}
      <div className="hidden md:block md:w-64 bg-white shadow-lg">
        {sidebarContent}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8">
          {/* モバイル用ハンバーガーボタン */}
          <div className="md:hidden">
            <button onClick={toggleSidebar} className="text-gray-700 hover:text-blue-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/mypage"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="ml-2 text-sm font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2 text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <span className="text-sm font-medium">Login</span>
                </button>
              </Link>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};
