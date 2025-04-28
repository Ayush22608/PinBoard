import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState } = useCart();
  const { setSearchQuery: searchDispatch } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchDispatch(searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center -ml-12">
            <div className="relative">
              <div className="absolute -left-6 -top-1 w-10 h-10 rounded-full bg-red-500/50"></div>
              <div className="absolute -left-2 -top-1 w-10 h-10 rounded-full bg-blue-500/50"></div>
              <span className="text-2xl font-light tracking-wider relative text-gray-800">
                Pin<span className="font-medium">Board</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">Categories</Link>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="ml-2 text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
            </form>

            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-gray-900" />
              {cartState.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.items.length}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/shop" className="block text-gray-700 hover:text-gray-900">Shop</Link>
            <Link to="/categories" className="block text-gray-700 hover:text-gray-900">Categories</Link>
            <form onSubmit={handleSearch} className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="ml-2 text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;