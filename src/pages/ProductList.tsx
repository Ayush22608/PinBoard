import React, { useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useCart } from '../contexts/CartContext';
import { usePosters } from '../contexts/PosterContext';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, X, Filter, SlidersHorizontal, ChevronRight, Tag, Check } from 'lucide-react';

const ProductList: React.FC = () => {
  const { posters, loading, error, fetchPosters } = usePosters();
  const { searchQuery, filters, setSearchQuery, setFilters } = useSearch();
  const { dispatch } = useCart();
  const [showFilters, setShowFilters] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  // Category can come from either URL path or query parameters
  const categoryFromPath = params.category;
  
  // Organize all product categories for filter component
  const categoryCounts = React.useMemo(() => {
    const counts: { [key: string]: number } = {};
    posters.forEach(product => {
      const category = product.category.toLowerCase();
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [posters]);

  // Update filters when route category changes
  useEffect(() => {
    if (categoryFromPath) {
      // If category is in the URL path, update filters
      setFilters({
        ...filters,
        category: decodeURIComponent(categoryFromPath)
      });
    } else {
      // If no category in path, clear the category filter
      const searchParams = new URLSearchParams(location.search);
      const categoryFromQuery = searchParams.get('category');
      
      if (categoryFromQuery) {
        // Support legacy query parameter approach
        setFilters({
          ...filters,
          category: decodeURIComponent(categoryFromQuery)
        });
      } else if (filters.category) {
        // Clear category if not in URL
        setFilters({
          ...filters,
          category: ''
        });
      }
    }
  }, [categoryFromPath, location.search]);

  // Update URL when search query changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchQuery) {
      searchParams.set('q', searchQuery);
    } else {
      searchParams.delete('q');
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [searchQuery, navigate, location.search]);

  // Initialize search from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [location.search, setSearchQuery]);

  // Filter products based on search query and filters
  const filteredProducts = React.useMemo(() => {
    // Use category from path params (route) or filters (which includes query params)
    const activeCategory = categoryFromPath || filters.category;
    
    return posters.filter(product => {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term =>
        product.title?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.tags?.some(tag => tag.toLowerCase().includes(term))
      );
      
      const matchesCategory = !activeCategory || 
        product.category.toLowerCase() === activeCategory.toLowerCase();
        
      return matchesSearch && matchesCategory;
    });
  }, [posters, searchQuery, filters.category, categoryFromPath]);

  // Sort products
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
      }
    });
  }, [filteredProducts, filters.sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect watching searchQuery
  };

  const clearSearch = () => {
    setSearchQuery('');
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('q');
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const handleCategoryClick = (category: string) => {
    // Navigate to a dedicated category route
    navigate(`/shop/category/${category.toLowerCase()}`);
  };

  const clearCategoryFilter = () => {
    // Navigate to the main shop page
    navigate('/shop');
    setFilters(prev => ({ ...prev, category: '' }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {categoryFromPath 
                ? `${decodeURIComponent(categoryFromPath).charAt(0).toUpperCase() + decodeURIComponent(categoryFromPath).slice(1)} Posters` 
                : filters.category 
                ? `${filters.category} Posters` 
                : 'Discover Our Collection'
              }
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {categoryFromPath || filters.category 
                ? `Browse our selection of ${categoryFromPath || filters.category} posters`
                : 'Find the perfect poster to transform your space'
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search posters by title, description, category, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                )}
              </form>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Found {filteredProducts.length} results for "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Toggle Button - Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-72 space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm`}>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <SlidersHorizontal size={20} />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Categories</label>
                  {(categoryFromPath || filters.category) && (
                    <button
                      onClick={clearCategoryFilter}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 pr-2">
                  {Object.entries(categoryCounts)
                    .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
                    .map(([category, count]) => {
                      const isActive = (categoryFromPath && categoryFromPath.toLowerCase() === category.toLowerCase()) || 
                                      (!categoryFromPath && filters.category.toLowerCase() === category.toLowerCase());
                      
                      return (
                        <div 
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer transition-colors ${
                            isActive 
                              ? 'bg-gray-900 text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isActive && <Check size={16} className="flex-shrink-0" />}
                            <span className="capitalize">{category}</span>
                          </div>
                          <span className="text-xs opacity-75">{count}</span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <button
                  onClick={() => fetchPosters()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && sortedProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="group transition-all duration-700"
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      card.style.setProperty('--mouse-x', `${x}px`);
                      card.style.setProperty('--mouse-y', `${y}px`);
                    }}
                    style={{ ['--mouse-x' as any]: '0px', ['--mouse-y' as any]: '0px' }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-4">
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 50%)'
                        }}
                      ></div>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <div className="self-start inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 text-xs tracking-wider transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 font-medium">
                            VIEW POSTER
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-neutral-900 group-hover:text-secondary-500 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-lg font-semibold text-neutral-900">
                          ₹{product.price}
                        </p>
                      </div>
                      <div className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-600">
                        {product.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && sortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      category: '',
                      priceRange: [0, 1000],
                      sortBy: 'newest'
                    });
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductList); 