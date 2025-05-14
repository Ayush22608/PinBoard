import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Poster } from '../../types/poster';
import PosterModal from './PosterModal';

const Posters: React.FC = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Poster>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([
    'Anime',
    'Movies',
    'TV Shows',
    'Art',
    'Music',
    'Sports',
    'Nature',
    'Gaming',
    'Abstract',
    'Minimalist',
    'Vintage',
    'Modern'
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      const postersSnapshot = await getDocs(collection(db, 'posters'));
      const postersData = postersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Poster[];

      // Extract unique categories from posters and combine with default categories
      const posterCategories = Array.from(new Set(postersData.map(poster => poster.category)));
      const allCategories = Array.from(new Set([...categories, ...posterCategories]));
      setCategories(allCategories);
      
      setPosters(postersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posters:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this poster?')) {
      try {
        await deleteDoc(doc(db, 'posters', id));
        setPosters(posters.filter(poster => poster.id !== id));
      } catch (error) {
        console.error('Error deleting poster:', error);
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await updateDoc(doc(db, 'posters', id), {
        featured: !currentFeatured
      });
      setPosters(posters.map(poster => 
        poster.id === id ? { ...poster, featured: !currentFeatured } : poster
      ));
    } catch (error) {
      console.error('Error updating poster:', error);
    }
  };

  const handleSubmit = async (posterData: Partial<Poster>) => {
    try {
      // Ensure we're using the correct field names
      const formattedData = {
        ...posterData,
        title: posterData.title,
        description: posterData.description,
        price: posterData.price,
        category: posterData.category,
        stock: posterData.stock,
        dimensions: posterData.dimensions,
        tags: posterData.tags,
        imageUrl: posterData.imageUrl,
        featured: posterData.featured,
        updatedAt: new Date()
      };

      if (editingPoster) {
        await updateDoc(doc(db, 'posters', editingPoster.id), formattedData);
        setPosters(posters.map(poster => 
          poster.id === editingPoster.id ? { ...poster, ...formattedData } : poster
        ));
      } else {
        const docRef = await addDoc(collection(db, 'posters'), {
          ...formattedData,
          createdAt: new Date()
        });
        setPosters([...posters, { id: docRef.id, ...formattedData } as Poster]);
      }
    } catch (error) {
      console.error('Error saving poster:', error);
      throw error;
    }
  };

  const handleSort = (field: keyof Poster) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredPosters = posters
    .filter(poster => 
      poster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poster.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(poster => 
      selectedCategory === 'all' || poster.category === selectedCategory
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      
      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const SortIcon: React.FC<{ field: keyof Poster }> = ({ field }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-neutral-900">Manage Posters</h1>
        <button
          type="button"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors duration-200 shadow-sm"
          onClick={() => {
            setEditingPoster(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} />
          <span>Add New Poster</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search posters..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}>
                <div className="flex items-center">
                  Title
                  <SortIcon field="title" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('category')}>
                <div className="flex items-center">
                  Category
                  <SortIcon field="category" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}>
                <div className="flex items-center">
                  Price
                  <SortIcon field="price" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('stock')}>
                <div className="flex items-center">
                  Stock
                  <SortIcon field="stock" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredPosters.map((poster) => (
              <tr key={poster.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={poster.imageUrl}
                        alt={poster.title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">
                        {poster.title}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {poster.dimensions}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                    {poster.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  ${poster.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {poster.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      onClick={() => {
                        setEditingPoster(poster);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(poster.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className={`px-2 py-1 text-xs rounded-full ${
                        poster.featured
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                      onClick={() => handleToggleFeatured(poster.id, poster.featured)}
                    >
                      {poster.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PosterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPoster(null);
        }}
        onSubmit={handleSubmit}
        poster={editingPoster || undefined}
        categories={categories}
      />
    </div>
  );
};

export default Posters; 