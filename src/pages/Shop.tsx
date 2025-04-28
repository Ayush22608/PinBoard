import React from 'react';
import { useSearch } from '../context/SearchContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
  const { searchQuery } = useSearch();
  const { dispatch } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: typeof products[0]) => {
    try {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-light text-gray-800 mb-2">
          Our <span className="font-medium">Collection</span>
        </h1>
        <p className="text-gray-600 mb-8">
          {searchQuery 
            ? `Search results for "${searchQuery}"` 
            : "Discover our curated selection of premium posters"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">₹{product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop; 