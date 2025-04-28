import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CustomizationOptions {
  size: {
    name: string;
    dimensions: string;
    price: number;
  };
  paper: {
    name: string;
    description: string;
    price: number;
  };
  frame: {
    name: string;
    description: string;
    price: number;
  } | null;
}

const sizeOptions = [
  { name: 'Small', dimensions: '12" x 16"', price: 0 },
  { name: 'Medium', dimensions: '18" x 24"', price: 200 },
  { name: 'Large', dimensions: '24" x 36"', price: 400 },
  { name: 'Extra Large', dimensions: '36" x 48"', price: 600 },
];

const paperOptions = [
  { name: 'Standard', description: 'High-quality matte paper', price: 0 },
  { name: 'Premium', description: 'Enhanced color reproduction', price: 100 },
  { name: 'Lustre', description: 'Semi-gloss finish', price: 150 },
  { name: 'Canvas', description: 'Premium canvas print', price: 300 },
];

const frameOptions = [
  { name: 'No Frame', description: 'Print only', price: 0 },
  { name: 'Basic Black', description: 'Simple black frame', price: 500 },
  { name: 'Premium Wood', description: 'Natural wood frame', price: 800 },
  { name: 'Metal Frame', description: 'Modern metal frame', price: 1000 },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const product = products.find(p => p.id === id);

  const [customization, setCustomization] = useState<CustomizationOptions>({
    size: sizeOptions[1], // Default to Medium
    paper: paperOptions[0], // Default to Standard
    frame: frameOptions[0], // Default to No Frame
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateTotal = () => {
    const basePrice = product.price;
    const sizePrice = customization.size.price;
    const paperPrice = customization.paper.price;
    const framePrice = customization.frame?.price || 0;
    return basePrice + sizePrice + paperPrice + framePrice;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotal();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${customization.size.name}-${customization.paper.name}-${customization.frame?.name || 'noframe'}`,
        name: `${product.name} (${customization.size.name})`,
        price: totalPrice,
        image: product.image,
        description: `${product.description} | Size: ${customization.size.dimensions} | Paper: ${customization.paper.name} | Frame: ${customization.frame?.name || 'No Frame'}`,
        quantity: 1
      }
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            />
          </div>

          {/* Product Details and Customization */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">Select Size</h2>
              <div className="grid grid-cols-2 gap-4">
                {sizeOptions.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setCustomization(prev => ({ ...prev, size }))}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      customization.size.name === size.name
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{size.name}</div>
                    <div className="text-sm text-gray-600">{size.dimensions}</div>
                    {size.price > 0 && (
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        +₹{size.price}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">Paper Type</h2>
              <div className="grid grid-cols-2 gap-4">
                {paperOptions.map((paper) => (
                  <button
                    key={paper.name}
                    onClick={() => setCustomization(prev => ({ ...prev, paper }))}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      customization.paper.name === paper.name
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{paper.name}</div>
                    <div className="text-sm text-gray-600">{paper.description}</div>
                    {paper.price > 0 && (
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        +₹{paper.price}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">Frame Options</h2>
              <div className="grid grid-cols-2 gap-4">
                {frameOptions.map((frame) => (
                  <button
                    key={frame.name}
                    onClick={() => setCustomization(prev => ({ ...prev, frame: frame.name === 'No Frame' ? null : frame }))}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      (customization.frame?.name === frame.name || (!customization.frame && frame.name === 'No Frame'))
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{frame.name}</div>
                    <div className="text-sm text-gray-600">{frame.description}</div>
                    {frame.price > 0 && (
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        +₹{frame.price}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Price and Add to Cart */}
            <div className="pt-8 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-medium text-gray-800">Total Price</span>
                <span className="text-3xl font-bold text-gray-900">₹{calculateTotal()}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 