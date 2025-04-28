import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    try {
      if (quantity < 1) return;
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any posters to your cart yet.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {state.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xl font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total: ₹{total}</span>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 