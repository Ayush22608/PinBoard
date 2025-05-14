import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Tag, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/posters', label: 'Posters', icon: <Image size={20} /> },
    { path: '/admin/categories', label: 'Categories', icon: <Tag size={20} /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-secondary-50 text-secondary-600 border-r-4 border-secondary-500'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 pt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 