import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import LoadingScreen from './components/LoadingScreen';

// Add this at the top of the file
// This would typically be done in index.html or by importing fonts in CSS
const loadFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  useEffect(() => {
    loadFonts();
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-800 bg-white overflow-x-hidden">
      <ScrollToTop />
      {!isAdminRoute && (
        <>
          {/* Navbar is fixed at top */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          
          {/* Announcement bar is fixed below the navbar */}
          <div className="fixed top-20 left-0 right-0 z-40">
            <AnnouncementBar />
          </div>
          
          {/* Spacer for fixed elements */}
          <div className="h-28"></div>
        </>
      )}
      
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </CartProvider>
    </Router>
  );
};

export default App;