import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeFromCart, updateQuantity, fetchCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{state.error}</div>
      </div>
    );
  }

  if (!state.items || state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </h3>
              <p className="text-gray-600">${item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.product._id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; 