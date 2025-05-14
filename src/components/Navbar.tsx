import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/images/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="PinBoard Logo" 
              className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'HOME' },
              { path: '/shop', label: 'SHOP' },
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`relative px-1 py-2 font-light text-sm tracking-widest transition-all duration-300
                  ${isActive(item.path) 
                    ? 'text-neutral-900' 
                    : 'text-neutral-500 hover:text-neutral-800'}`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-secondary-400"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Login/User Menu and Cart */}
          <div className="flex items-center space-x-4">
            {/* User Menu / Login Button */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-300"
āā                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={20} className="opacity-80" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-1 ring-1 ring-black ring-opacity-5 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-100">
                        <p className="font-medium truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="relative group">
              <div className="p-2 transition-colors duration-300">
                <ShoppingCart size={20} className="text-neutral-700 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                {cartState.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {cartState.items.length}
                  </span>
                )}
              </div>
            </Link>

            <button
              className="md:hidden p-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="text-neutral-800" /> : <Menu size={20} className="text-neutral-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 shadow-sm animate-in slide-in-from-top duration-300">
          <div className="px-6 py-4 space-y-4">
            {[
              { path: '/', label: 'HOME' },
              { path: '/shop', label: 'SHOP' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-base font-medium ${
                  isActive(item.path) ? 'text-neutral-900' : 'text-neutral-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;