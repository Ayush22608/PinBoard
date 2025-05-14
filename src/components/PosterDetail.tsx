import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosters } from '../contexts/PosterContext';
import { Loader2, ArrowLeft, ShoppingCart } from 'lucide-react';
import CloudinaryImage from './common/CloudinaryImage';

const PosterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchPoster, loading, error } = usePosters();
  const [poster, setPoster] = React.useState<any>(null);

  React.useEffect(() => {
    const loadPoster = async () => {
      if (id) {
        const data = await fetchPoster(id);
        setPoster(data);
      }
    };
    loadPoster();
  }, [id, fetchPoster]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !poster) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">{error || 'Poster not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8"
      >
        <ArrowLeft size={20} />
        Back to Posters
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto">
          <CloudinaryImage
            publicId={poster.imageUrl}
            alt={poster.title}
            width={1200}
            height={1600}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            priority={true}
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {poster.title}
            </h1>
            <p className="text-2xl font-semibold text-primary-600">
              ${poster.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">
              Description
            </h2>
            <p className="text-neutral-600 whitespace-pre-wrap">
              {poster.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-neutral-500">Category</h3>
              <p className="mt-1 text-neutral-900">{poster.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500">Dimensions</h3>
              <p className="mt-1 text-neutral-900">{poster.dimensions}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-500">Stock</h3>
              <p className="mt-1 text-neutral-900">
                {poster.stock > 0 ? `${poster.stock} available` : 'Out of stock'}
              </p>
            </div>
          </div>

          {poster.tags && poster.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {poster.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            className={`w-full md:w-auto px-8 py-3 rounded-lg flex items-center justify-center gap-2 ${
              poster.stock > 0
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
            disabled={poster.stock === 0}
          >
            <ShoppingCart size={20} />
            {poster.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosterDetail; 