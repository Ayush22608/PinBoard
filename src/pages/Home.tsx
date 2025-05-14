import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Award, Truck, Shield, MousePointer, ArrowDown, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import PosterCarousel from '../components/PosterCarousel';
import CategoryScroll from '../components/CategoryScroll';

// Add font imports
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

// Updated background SVG with modern, minimal design
const abstractBackgroundSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="800" viewBox="0 0 1440 800" fill="none">
    <g opacity="0.15">
      <path d="M0 0H1440V800H0V0Z" fill="url(#paint0_linear_1)"/>
      <path d="M1440 0H0V800H1440V0Z" fill="url(#paint1_linear_1)"/>
      <path d="M1440 0H0V800H1440V0Z" fill="url(#paint2_linear_1)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1" x1="0" y1="0" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F5F5F5"/>
        <stop offset="1" stop-color="#FFFFFF"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1" x1="1440" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFA500" stop-opacity="0.05"/>
        <stop offset="1" stop-color="#FF6B00" stop-opacity="0.02"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1" x1="720" y1="0" x2="720" y2="800" gradientUnits="userSpaceOnUse">
        <stop stop-color="#000000" stop-opacity="0.02"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>
`;

// Updated backgrounds to use more subtle colors
const bgThemes = [
  { bgColor: 'bg-white', accentColor: 'from-secondary-50', textColor: 'text-neutral-900' },
  { bgColor: 'bg-neutral-50', accentColor: 'from-primary-50', textColor: 'text-neutral-900' },
  { bgColor: 'bg-white', accentColor: 'from-secondary-50', textColor: 'text-neutral-900' }
];

// Updated categories with appropriate counts
const categories = [
  {
    id: 'movies',
    name: 'Movies',
    count: 15
  },
  {
    id: 'shows',
    name: 'TV Shows',
    count: 2
  },
  {
    id: 'anime',
    name: 'Anime',
    count: 0
  },
  {
    id: 'art',
    name: 'Art',
    count: 0
  },
  {
    id: 'music',
    name: 'Music',
    count: 0
  },
  {
    id: 'sports',
    name: 'Sports',
    count: 0
  },
  {
    id: 'nature',
    name: 'Nature',
    count: 0
  },
  {
    id: 'gaming',
    name: 'Gaming',
    count: 0
  },
  {
    id: 'abstract',
    name: 'Abstract',
    count: 0
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    count: 0
  },
  {
    id: 'vintage',
    name: 'Vintage',
    count: 0
  },
  {
    id: 'modern',
    name: 'Modern',
    count: 0
  }
];

const Home: React.FC = () => {
  // Get top selling posters (assuming first 8 are top sellers)
  const topSellingPosters = products.slice(0, 8);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePoster, setActivePoster] = useState(0);
  const [isInViewport, setIsInViewport] = useState<{[key: string]: boolean}>({
    'features': false,
    'collection': false,
    'newsletter': false
  });
  
  const featuredProducts = products.slice(0, 4);
  const sliderRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const posterIntervalRef = useRef<any>(null);
  
  // Convert SVG to data URL
  const backgroundDataUrl = `data:image/svg+xml,${encodeURIComponent(abstractBackgroundSvg)}`;

  // Handle intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setIsInViewport(prev => ({...prev, [entry.target.id]: true}));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (collectionRef.current) observer.observe(collectionRef.current);
    if (newsletterRef.current) observer.observe(newsletterRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  // Handle hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Handle poster slideshow - changed to 4000 milliseconds (4 seconds)
  useEffect(() => {
    posterIntervalRef.current = setInterval(() => {
      setActivePoster(prev => (prev + 1) % topSellingPosters.length);
    }, 4000); // Changed to 4 seconds
    
    return () => {
      if (posterIntervalRef.current) {
        clearInterval(posterIntervalRef.current);
      }
    };
  }, [topSellingPosters.length]);
  
  // Navigate to previous poster - updated to 4 seconds
  const prevPoster = () => {
    if (posterIntervalRef.current) {
      clearInterval(posterIntervalRef.current);
    }
    setActivePoster(prev => (prev === 0 ? topSellingPosters.length - 1 : prev - 1));
    posterIntervalRef.current = setInterval(() => {
      setActivePoster(prev => (prev + 1) % topSellingPosters.length);
    }, 4000);
  };
  
  // Navigate to next poster - updated to 4 seconds
  const nextPoster = () => {
    if (posterIntervalRef.current) {
      clearInterval(posterIntervalRef.current);
    }
    setActivePoster(prev => (prev + 1) % topSellingPosters.length);
    posterIntervalRef.current = setInterval(() => {
      setActivePoster(prev => (prev + 1) % topSellingPosters.length);
    }, 4000);
  };
  
  // Poster hover effect handler
  const handlePosterHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 overflow-hidden font-inter">
      {/* Hero Section with Modern Design */}
      <div className="w-full min-h-screen relative flex flex-col overflow-hidden pt-16">
        {/* Static artistic background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-white relative"
            style={{
              backgroundImage: `url("${backgroundDataUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Add subtle noise texture overlay */}
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10"></div>
          </div>
        </div>
        
        {/* Dynamic color overlays */}
        {bgThemes.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <div className={`w-full h-full ${slide.bgColor} bg-opacity-30 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${slide.accentColor} to-transparent opacity-20`}></div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/5 to-transparent"></div>
            </div>
          </div>
        ))}
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Top content */}
          <div className="w-full flex items-center justify-center p-6 pt-16">
            <div className="max-w-2xl text-center">
              <h1 className="text-4xl md:text-6xl font-playfair font-light tracking-tight mb-4 text-neutral-900">
                Transform Your Space.
              </h1>
              <p className="text-base font-light text-neutral-600 mb-6">
                Discover our curated collection of premium posters that bring art, inspiration, and personality to your living spaces.
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-2.5 text-sm tracking-wider hover:bg-neutral-800 transition-all duration-300 font-medium"
                >
                  SHOP NOW
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom content - Featured Posters */}
          <div className="w-full flex-1 flex items-center justify-center px-6 pb-12">
            <PosterCarousel posters={topSellingPosters} />
          </div>
        </div>
      </div>

      {/* Browse categories section with background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50"></div>
        <div className="relative z-10">
          <CategoryScroll />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="w-full py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 opacity-50"></div>
        <div className="relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-light tracking-tight">Why Choose PinBoard?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award size={24} className="text-secondary-500" />,
                  title: "Quality Guarantee",
                  description: "Premium prints with archival inks that last for decades."
                },
                {
                  icon: <Truck size={24} className="text-secondary-500" />,
                  title: "Fast Shipping",
                  description: "Quick delivery with free shipping on orders above ₹999."
                },
                {
                  icon: <Shield size={24} className="text-secondary-500" />,
                  title: "Best Offers",
                  description: "Regular discounts and exclusive deals for customers."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
                  title: "Best Prices",
                  description: "Enjoy the most competitive poster prices online, starting at just ₹79."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-sm shadow-sm p-6 text-center transition-all duration-700 delay-${index * 150} ${
                    isInViewport.features 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-playfair font-light mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collection Preview */}
      <div id="collection" ref={collectionRef} className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className={`w-24 h-px bg-secondary-500 mb-4 transition-all duration-1000 delay-300 ${
                isInViewport.collection ? 'opacity-100 scale-x-100 origin-left' : 'opacity-0 scale-x-0'
              }`}></div>
              <h2 className="text-4xl font-playfair font-light tracking-tight mb-4">Featured Collection</h2>
              <p className="text-lg text-neutral-600 max-w-2xl font-light">
                Explore our handpicked selection of trending posters that are making waves in interior design.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-neutral-900 hover:text-secondary-500 transition-colors duration-300 font-medium"
            >
              VIEW ALL
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`group transition-all duration-700 delay-${index * 100} ${
                  isInViewport.collection 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                onMouseMove={handlePosterHover}
                style={{ ['--mouse-x' as any]: '0px', ['--mouse-y' as any]: '0px' }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 50%)'
                    }}
                  ></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="self-start inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 text-xs tracking-wider transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 font-medium"
                    >
                      VIEW POSTER
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-playfair font-light transition-colors duration-300 group-hover:text-secondary-500">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-light">₹{product.price}</span>
                    <span className="text-xs tracking-wider text-neutral-500 px-2 py-0.5 border-b border-neutral-200 group-hover:border-secondary-400 transition-colors duration-300 font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div id="newsletter" ref={newsletterRef} className="w-full py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
            isInViewport.newsletter 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-4xl font-playfair font-light tracking-tight mb-4">Stay Inspired</h2>
            <p className="text-lg text-neutral-600 mb-8 font-light">
              Subscribe to our newsletter for exclusive offers, new arrivals, and interior design tips.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white border border-neutral-200 focus:border-secondary-500 focus:outline-none font-light"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-300 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 