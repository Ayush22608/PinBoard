import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Award, Truck, Shield } from 'lucide-react';
import { products } from '../data/products';

const Home: React.FC = () => {
  // Get the first 3 products for the featured section
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-light text-white mb-6 leading-tight">
              Transform Your Space with
              <br />
              <span className="font-medium">Timeless Posters</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Discover our curated collection of premium posters that bring art and inspiration to your walls.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-full text-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <ChevronRight className="w-8 h-8 text-white rotate-90" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">
              Why Choose <span className="font-medium">Our Posters</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium quality posters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Our posters are printed on high-quality paper with vibrant colors and sharp details that last for years.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your posters delivered quickly and safely with our reliable shipping service across India.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Secure Payment</h3>
              <p className="text-gray-600">
                Shop with confidence using our secure payment options and easy return policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posters Section */}
      <div className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-4">
              Featured <span className="font-medium">Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium posters that will transform your space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <div className="aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-medium text-white mb-2">{product.name}</h3>
                    <p className="text-gray-200 mb-4">{product.description}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center gap-2 text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors"
                    >
                      View Details
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              View All Posters
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 