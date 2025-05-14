import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

interface CategoryGridProps {
  categoryCounts: { [key: string]: number };
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categoryCounts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { filters, setFilters } = useSearch();
  
  // Get current category from URL params
  const currentCategory = params.category || '';

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
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-4 rounded-lg border transition-colors ${
              (currentCategory.toLowerCase() === category.toLowerCase() || 
              (!currentCategory && filters.category.toLowerCase() === category.toLowerCase()))
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-900'
            }`}
          >
            <h3 className="text-lg font-medium capitalize">{category}</h3>
            <p className="text-sm opacity-75">{count} posters</p>
          </button>
        ))}
      </div>
      {(currentCategory || filters.category) && (
        <div className="mt-4 text-center">
          <button
            onClick={clearCategoryFilter}
            className="text-neutral-600 hover:text-neutral-900 underline"
          >
            Clear category filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid; 