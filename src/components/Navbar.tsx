import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { state: cartState } = useCart();
  const { setSearchQuery: searchDispatch } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchDispatch(searchQuery);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // For demo purposes
  const handleMockLogin = () => {
    // Instead of relying on auth, just navigate to auth page
    navigate('/auth');
  };

  // For demo purposes
  const handleMockAdmin = () => {
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-sm' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative flex items-center">
              <div className="absolute -left-1.5 top-0 w-7 h-7 transform -rotate-12 bg-secondary-400 rounded-sm transition-all duration-300 group-hover:rotate-0"></div>
              <div className="absolute -left-0.5 top-1 w-1.5 h-1.5 bg-white rounded-full z-10"></div>
              <span className="text-2xl font-display tracking-wider relative ml-6 text-neutral-800">
                Pin<span className="font-light tracking-tight">Board</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { path: '/', label: 'HOME' },
              { path: '/shop', label: 'SHOP' },
              { path: '/categories', label: 'CATEGORIES' },
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

          {/* Search, Login/User Menu, and Cart */}
          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative group">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 pl-10 w-48 bg-neutral-50 text-neutral-800 placeholder:text-neutral-400 rounded-none border-b border-neutral-200 focus:border-secondary-400 focus:outline-none transition-all duration-300"
              />
              <Search size={16} className="absolute left-3 text-neutral-400 group-focus-within:text-secondary-500 transition-colors duration-300" />
            </form>

            {/* User Menu / Login Button */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User size={20} className="opacity-80" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-1 ring-1 ring-black ring-opacity-5 z-50">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-100">
                        <p className="font-medium truncate">
                          {currentUser.email || "User"}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                      {currentUser.email === 'admin@pinboard.com' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Demo options - would be removed in production */}
                      <Link
                        to="/auth"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Sign in / Register
                      </Link>
                      <button
                        onClick={handleMockAdmin}
                        className="flex w-full items-center px-4 py-2 text-sm text-secondary-600 hover:bg-neutral-100"
                      >
                        Demo Admin Access
                      </button>
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
              { path: '/categories', label: 'CATEGORIES' },
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`block py-3 px-3 text-sm tracking-widest transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'text-neutral-900 border-b border-secondary-400' 
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Add login link to mobile menu */}
            <Link 
              to="/auth" 
              className="block py-3 px-3 text-sm tracking-widest transition-all duration-300 text-secondary-600 hover:text-secondary-800"
            >
              SIGN IN
            </Link>
            
            <form onSubmit={handleSearch} className="flex items-center mt-6">
              <div className="relative flex-1">
              <input
                type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-neutral-50 text-neutral-800 placeholder:text-neutral-400 border-none focus:outline-none"
              />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
              <button type="submit" className="ml-2 p-3 bg-secondary-500 text-white hover:bg-secondary-600 transition-colors">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;