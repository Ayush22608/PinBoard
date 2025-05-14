import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ArrowLeft, Star, Check, Info, Truck } from 'lucide-react';
import { products } from '../data/products'; // Import local product data as fallback

interface Product {
  _id: string;
    name: string;
    description: string;
    price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  discount?: number;
  reviews?: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  details?: {
    dimensions?: string;
    material?: string;
    care?: string;
  };
}

// Poster size options with their prices
const sizeOptions = [
  { id: 'a4', name: 'A4', dimensions: '21 × 29.7 cm', priceMultiplier: 1 },
  { id: 'a3', name: 'A3', dimensions: '29.7 × 42 cm', priceMultiplier: 1.5 },
  { id: '13x19', name: '13×19 inches', dimensions: '33 × 48.3 cm', priceMultiplier: 2 }
];

// Mock data to use when we can't find the real product
const createMockProduct = (id: string) => {
  // Find any product from our local data to use as a base
  const localProduct = products[0] || {
    id: id,
    name: 'Sample Poster',
    description: 'A beautiful poster for your wall.',
    price: 79,
    image: '/placeholder.jpg',
    category: 'Poster'
  };
  
  return {
    _id: id,
    name: localProduct.name,
    description: localProduct.description,
    price: 79, // Fixed price for all posters
    imageUrl: localProduct.image,
    category: localProduct.category,
    inStock: true,
    details: {
      material: "Premium glossy paper",
      care: "Keep away from direct sunlight"
    }
  };
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) {
      setError('No product ID provided');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        console.log('Fetching product details from API:', id);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log('API response:', response.data);
        setProduct(response.data);
        setError(null);
        return;
      } catch (apiErr) {
        console.error('API fetch failed:', apiErr);
        
        if (axios.isAxiosError(apiErr) && apiErr.response) {
          // Get detailed error message from the API
          console.error('API error details:', apiErr.response.data);
          
          if (apiErr.response.status === 404) {
            console.warn('Product not found in database, falling back to mock data');
            // Create a mock product with the ID
            const mockProduct = createMockProduct(id);
            setProduct(mockProduct);
            setError(null);
            return;
          } else {
            // For 500 or other errors, show the actual error from the server
            const errorMsg = apiErr.response.data.error || 'Unknown server error';
            const errorDetails = apiErr.response.data.details || '';
            setError(`Server error: ${errorMsg}${errorDetails ? ` (${errorDetails})` : ''}`);
            return;
          }
        }
        
        // Fallback to mock data for network errors or other issues
        console.warn('Network error or other issue, falling back to mock data');
        const mockProduct = createMockProduct(id);
        setProduct(mockProduct);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to fetch product details: ${errorMessage}`);
      console.error('Error in product details component:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleSizeChange = (size: typeof sizeOptions[0]) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (product) {
      // Include the selected size and calculated price
      addToCart(product._id, quantity, {
        size: selectedSize.name,
        dimensions: selectedSize.dimensions,
        priceModifier: selectedSize.priceMultiplier
      });
      
      // Add success feedback
      alert('Added to cart successfully!');
    }
  };

  // Calculate final price based on size and any discounts
  const calculatePrice = () => {
    if (!product) return 0;
    
    const basePrice = product.price * selectedSize.priceMultiplier;
    
    if (product.discount) {
      return basePrice * (1 - product.discount / 100);
    }
    
    return basePrice;
  };

  // Calculate average rating from reviews
  const averageRating = () => {
    if (!product?.reviews || product.reviews.length === 0) return 0;
    
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error || 'Product not found'}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-neutral-600 hover:text-neutral-800 mb-8"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
        <div className="relative aspect-[3/4] bg-neutral-50">
            <img
            src={product.imageUrl}
              alt={product.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = '/placeholder.jpg'; // Fallback image
            }}
            />
          </div>

        {/* Product Info */}
        <div className="space-y-6">
            <div>
            <div className="flex flex-wrap items-center mb-2">
              <h1 className="text-3xl font-bold text-neutral-900 mr-3">{product.name}</h1>
              {product.discount && (
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2.5 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            
            {/* Product rating */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={16} 
                      className={star <= Math.round(averageRating()) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
            
            {/* Price display with discount if applicable */}
            <div className="mb-4">
              {product.discount ? (
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-neutral-900">
                    ₹{calculatePrice().toFixed(2)}
                  </p>
                  <p className="ml-2 text-lg text-gray-500 line-through">
                    ₹{(product.price * selectedSize.priceMultiplier).toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-neutral-900">
                  ₹{calculatePrice().toFixed(2)}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">Taxes included</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Description</h2>
            <p className="text-neutral-600">{product.description}</p>
            </div>

            {/* Size Selection */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">Size</h2>
            <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((size) => (
                  <button
                  key={size.id}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium ${
                    selectedSize.id === size.id
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{size.name}</span>
                  {selectedSize.id === size.id && (
                    <Check className="ml-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            <p className="text-sm text-gray-500 mt-2">
              {selectedSize.dimensions}
            </p>
            </div>

            <div className="space-y-4">
            {/* Quantity Selector */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-neutral-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 border border-r-0 border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-10 text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                  <button
                  className="w-10 h-10 border border-l-0 border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                  </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center text-sm text-gray-600">
              <Truck size={16} className="mr-2" />
              <span>Shipping calculated at checkout</span>
            </div>

            {/* Add to Cart Button */}
                  <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-md ${
                product.inStock
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 transition-colors'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} className="mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Product Details */}
          {product.details && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Product Details</h2>
              <div className="space-y-4">
                {product.details.material && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900">Material</h3>
                    <p className="text-neutral-600">{product.details.material}</p>
                  </div>
                )}
                {product.details.care && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900">Care Instructions</h3>
                    <p className="text-neutral-600">{product.details.care}</p>
                      </div>
                    )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Customer Reviews</h2>
          
          <div className="space-y-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={16} 
                        className={star <= review.rating 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{review.user}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-neutral-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails; 