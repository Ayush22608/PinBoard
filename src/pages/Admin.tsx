import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Product, products } from '../data/products';
import { BarChart3, PlusCircle, Grid, Users, ShoppingBag, ArrowLeft, LogOut, Save, Trash2, Edit, X } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const navigate = useNavigate();

  // Mock admin authentication check
  useEffect(() => {
    // In a real app, check if the user is authenticated and is an admin
    const checkAdmin = () => {
      // For demo purposes, we're not doing a real check
      // In production, this would verify the user has admin privileges
    };
    
    checkAdmin();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  const handleAddNewProduct = () => {
    setEditingProduct({
      id: (Math.max(...productList.map(p => parseInt(p.id))) + 1).toString(),
      name: '',
      description: '',
      price: 0,
      image: '',
      category: ''
    });
    setIsAddingProduct(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({...product});
    setIsAddingProduct(false);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;
    
    if (isAddingProduct) {
      setProductList([...productList, editingProduct]);
    } else {
      setProductList(productList.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
    }
    
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter(p => p.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingProduct) return;
    
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded shadow-sm border border-neutral-100">
        <h3 className="text-neutral-500 text-sm font-medium mb-2">Total Products</h3>
        <p className="text-3xl font-light">{productList.length}</p>
      </div>
      <div className="bg-white p-6 rounded shadow-sm border border-neutral-100">
        <h3 className="text-neutral-500 text-sm font-medium mb-2">Categories</h3>
        <p className="text-3xl font-light">{new Set(productList.map(p => p.category)).size}</p>
      </div>
      <div className="bg-white p-6 rounded shadow-sm border border-neutral-100">
        <h3 className="text-neutral-500 text-sm font-medium mb-2">Mock Orders</h3>
        <p className="text-3xl font-light">14</p>
      </div>
      <div className="bg-white p-6 rounded shadow-sm border border-neutral-100">
        <h3 className="text-neutral-500 text-sm font-medium mb-2">Mock Users</h3>
        <p className="text-3xl font-light">27</p>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Manage Products</h2>
        <button 
          className="flex items-center gap-2 bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600 transition-colors"
          onClick={handleAddNewProduct}
        >
          <PlusCircle size={16} />
          Add New Product
        </button>
      </div>
      
      {editingProduct ? (
        <div className="bg-white p-6 rounded shadow-sm border border-neutral-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{isAddingProduct ? 'Add New Product' : 'Edit Product'}</h3>
            <button 
              onClick={() => setEditingProduct(null)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-neutral-300 rounded"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editingProduct.image}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                <select
                  name="category"
                  value={editingProduct.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-neutral-300 rounded"
                >
                  <option value="">Select a category</option>
                  <option value="movies">Movies</option>
                  <option value="tv-shows">TV Shows</option>
                  <option value="abstract">Abstract</option>
                  <option value="nature">Nature</option>
                </select>
              </div>
              
              {editingProduct.image && (
                <div>
                  <p className="block text-sm font-medium text-neutral-700 mb-1">Image Preview</p>
                  <div className="w-32 h-40 overflow-hidden border border-neutral-200 rounded">
                    <img 
                      src={editingProduct.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              className="mr-4 px-4 py-2 text-neutral-600 hover:text-neutral-800"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600 transition-colors"
              onClick={handleSaveProduct}
            >
              <Save size={16} />
              Save Product
            </button>
          </div>
        </div>
      ) : null}
      
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-16 overflow-hidden rounded">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">{product.name}</div>
                  <div className="text-xs text-neutral-500 truncate max-w-xs">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 text-neutral-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  ₹{product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-secondary-600 hover:text-secondary-900 mr-4"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Admin Header */}
      <header className="bg-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-8 h-8 bg-secondary-500 rounded-sm transform -rotate-12"></div>
                <div className="absolute top-1.5 left-1 w-1.5 h-1.5 bg-white rounded-full z-10"></div>
              </div>
              <h1 className="ml-4 text-xl font-light">PinBoard Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNavigateBack}
                className="flex items-center text-white/80 hover:text-white"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Site
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center text-white/80 hover:text-white"
              >
                <LogOut size={16} className="mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-8 md:mb-0">
            <div className="bg-white rounded shadow-sm p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full flex items-center py-2 px-4 rounded transition-colors ${
                      activeTab === 'dashboard' 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <BarChart3 size={16} className="mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center py-2 px-4 rounded transition-colors ${
                      activeTab === 'products' 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={() => setActiveTab('products')}
                  >
                    <Grid size={16} className="mr-3" />
                    Products
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center py-2 px-4 rounded transition-colors ${
                      activeTab === 'orders' 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag size={16} className="mr-3" />
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full flex items-center py-2 px-4 rounded transition-colors ${
                      activeTab === 'users' 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users size={16} className="mr-3" />
                    Users
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-light text-neutral-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'products' && 'Products'}
                {activeTab === 'orders' && 'Orders'}
                {activeTab === 'users' && 'Users'}
              </h1>
            </div>
            
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && (
              <div className="bg-white p-10 rounded shadow-sm border border-neutral-100 text-center text-neutral-500">
                The Orders management feature is not implemented in this demo.
              </div>
            )}
            {activeTab === 'users' && (
              <div className="bg-white p-10 rounded shadow-sm border border-neutral-100 text-center text-neutral-500">
                The Users management feature is not implemented in this demo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 