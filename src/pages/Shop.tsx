import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { usePosters } from '../contexts/PosterContext';
import { useCart } from '../contexts/CartContext';
import { useSearch } from '../contexts/SearchContext';
import ShopFilters from '../components/ShopFilters';

interface Filters {
  category: string;
  priceRange: [number, number];
  sortBy: string;
}

const Shop: React.FC = () => {
  const { posters, loading, error, fetchPosters } = usePosters();
  const { addToCart } = useCart();
  const { searchQuery, setSearchQuery, filters, setFilters } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isInViewport, setIsInViewport] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Debug filters and products
  console.log('Current filters:', filters);
  console.log('Available posters:', posters.map(p => ({ id: p.id, title: p.title, category: p.category })));

  useEffect(() => {
    fetchPosters();
  }, [fetchPosters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      // Make sure to decode the URL parameter
      const decodedCategory = decodeURIComponent(categoryFromUrl);
      console.log('Setting category from URL:', decodedCategory);
      
      // Update filters with the decoded category
      setFilters({
        category: decodedCategory,
        priceRange: filters.priceRange,
        sortBy: filters.sortBy
      });
    }
  }, [location.search, setFilters, filters.priceRange, filters.sortBy]);

  // Filter products based on search query and category
  const filteredProducts = React.useMemo(() => {
    // Get category directly from URL each time we filter
    const categoryParam = new URLSearchParams(location.search).get('category');
    
    // Log what we're filtering by
    console.log(`Filtering by URL category parameter: "${categoryParam}"`);
    console.log('All available products:', posters.map(p => ({ id: p.id, title: p.title, category: p.category })));
    
    return posters.filter(product => {
      // Text search filtering (case insensitive)
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filtering (case insensitive)
      // Only filter if we have a category param
      const matchesCategory = !categoryParam || 
        product.category.toLowerCase() === categoryParam.toLowerCase();
      
      // For debugging
      if (categoryParam && product.category.toLowerCase() === categoryParam.toLowerCase()) {
        console.log(`MATCH: Product "${product.title}" with category "${product.category}" matches filter "${categoryParam}"`);
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [posters, searchQuery, location.search]);

  // Log filtered results
  console.log(`Filtered ${filteredProducts.length} products out of ${posters.length}`);

  const categoryCounts = React.useMemo(() => {
    const counts: { [key: string]: number } = {};
    posters.forEach(product => {
      const category = product.category.toLowerCase();
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [posters]);

  // Poster hover effect handler
  const handlePosterHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Handle intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (productsRef.current) observer.observe(productsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (category: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', category);
    navigate({ search: searchParams.toString() });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Hero Section */}
      <div className="w-full h-[40vh] relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center h-full w-full">
          <div className="text-center max-w-3xl px-4">
            {/* Get category directly from URL for display */}
            {(() => {
              const categoryParam = new URLSearchParams(location.search).get('category');
              const categoryName = categoryParam 
                ? decodeURIComponent(categoryParam)
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
                : '';
              
              return (
                <>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6 text-neutral-900">
                    {categoryName || 'Our Collection'}
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8">
                    {categoryName
                      ? `Browse our ${categoryName} posters collection`
                      : searchQuery 
                ? `Search results for "${searchQuery}"` 
                : "Discover our curated selection of premium posters that elevate your surroundings."}
            </p>
                </>
              );
            })()}
            <input
              type="text"
              placeholder="Search posters..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full max-w-md mx-auto px-4 py-2 rounded-full border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <ShopFilters categoryCounts={categoryCounts} />

      {/* Products Section */}
      <div ref={productsRef} className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          {filters.category && (
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-light">Showing {filteredProducts.length} {filters.category} posters</h2>
            </div>
          )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`group transition-all duration-700 delay-${index % 6 * 100} cursor-pointer ${
                      isInViewport 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                    }`}
                    onMouseMove={handlePosterHover}
                    style={{ ['--mouse-x' as any]: '0px', ['--mouse-y' as any]: '0px' }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <Link
                          to={`/product/${product.id}`}
                          className="self-start inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 text-xs tracking-wider transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
                        >
                          VIEW POSTER
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                      <h3 className="text-base font-light transition-colors duration-300 group-hover:text-secondary-500">
                      {product.title}
                      </h3>
                        <span className="text-lg font-light">₹{product.price}</span>
                  </div>
                  <span className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-600 ml-2">
                          {product.category}
                        </span>
                      </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 py-2 text-sm border border-neutral-200 text-neutral-900 hover:border-secondary-500 hover:text-secondary-500 transition-all duration-300"
                        >
                          Add to Cart
                        </button>
                  </div>
                ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-light mb-4">No results found</h3>
              <p className="text-neutral-600">
                {new URLSearchParams(location.search).get('category')
                  ? `No ${new URLSearchParams(location.search).get('category')} posters found. Try a different category or browse our collection.`
                  : "Try a different search term or browse our collection"}
              </p>
              {new URLSearchParams(location.search).get('category') && (
                <button
                  onClick={() => {
                    const searchParams = new URLSearchParams(location.search);
                    searchParams.delete('category');
                    navigate({ search: searchParams.toString() });
                  }}
                  className="mt-4 px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  View All Categories
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 