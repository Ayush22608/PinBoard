import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  const { state, dispatch, removeFromCart } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {state.items.map(item => (
        <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <p className="text-sm text-gray-500 mt-1">Size: 24" x 36"</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2 border rounded-lg p-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      <div className="border-t pt-4 mt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};