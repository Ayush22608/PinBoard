import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Film, 
  Music, 
  Tv, 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  MonitorPlay,
  Palette,
  Mountain,
  Zap,
  Leaf,
  Clock,
  Building2
} from 'lucide-react';
import { usePosters } from '../contexts/PosterContext';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryScrollProps {
  categories?: Category[]; // Make categories optional
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories: propCategories }) => {
  const navigate = useNavigate();
  const { posters } = usePosters();
  const [categories, setCategories] = useState<Category[]>([]);

  // Calculate real categories and counts from actual posters
  useEffect(() => {
    // Skip if categories are provided as props
    if (propCategories && propCategories.length > 0) {
      setCategories(propCategories);
      return;
    }

    // Calculate categories from posters data
    const categoryMap: { [key: string]: number } = {};
    posters.forEach(poster => {
      // Use the exact category string from the poster - do not modify case
      const category = poster.category;
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    // Convert to Category array - preserve original case
    const calculatedCategories = Object.entries(categoryMap).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1), // Only capitalize for display
      count
    }));

    setCategories(calculatedCategories);
  }, [posters, propCategories]);

  // Map category IDs to their respective icons
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId.toLowerCase()) {
      case 'movies':
        return <Film className="w-6 h-6" />;
      case 'music':
        return <Music className="w-6 h-6" />;
      case 'anime':
        return <Tv className="w-6 h-6" />;
      case 'sports':
        return <Trophy className="w-6 h-6" />;
      case 'art':
        return <Palette className="w-6 h-6" />;
      case 'shows':
        return <MonitorPlay className="w-6 h-6" />;
      case 'gaming':
        return <Gamepad2 className="w-6 h-6" />;
      case 'nature':
        return <Leaf className="w-6 h-6" />;
      case 'abstract':
        return <Zap className="w-6 h-6" />;
      case 'minimalist':
        return <Sparkles className="w-6 h-6" />;
      case 'vintage':
        return <Clock className="w-6 h-6" />;
      case 'modern':
        return <Building2 className="w-6 h-6" />;
      default:
        return <Film className="w-6 h-6" />;
    }
  };

  // Handle category navigation
  const handleCategoryClick = (category: string) => {
    console.log(`Navigating to category: ${category}`);
    // Use the new path-based category route
    navigate(`/shop/category/${encodeURIComponent(category.toLowerCase())}`);
  };

  // Debug function to see what data we're working with
  console.log('Category data:', categories);
  console.log('Poster data:', posters.map(p => p.category));

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair font-light tracking-tight text-neutral-900 mb-2">Browse Categories</h2>
          <p className="text-neutral-600 text-sm">Explore our curated collection of posters across different themes</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group flex flex-col items-center p-4 rounded-lg border border-neutral-200 hover:border-secondary-500 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-neutral-50 group-hover:bg-secondary-50 transition-colors duration-300">
                <div className="text-neutral-600 group-hover:text-secondary-500 transition-colors duration-300">
                  {getCategoryIcon(category.id)}
                </div>
              </div>
              <h3 className="text-sm font-medium text-neutral-900 group-hover:text-secondary-500 transition-colors duration-300">
                {category.name}
              </h3>
              <span className="text-xs text-neutral-500 mt-1">
                {category.count} Posters
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScroll; 