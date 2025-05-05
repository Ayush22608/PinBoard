import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Award, Truck, Shield, MousePointer, ArrowDown, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';

// Updated backgrounds to use only light colors
const bgThemes = [
  { bgColor: 'bg-neutral-50', accentColor: 'from-secondary-100', textColor: 'text-neutral-900' },
  { bgColor: 'bg-neutral-100', accentColor: 'from-primary-50', textColor: 'text-neutral-900' },
  { bgColor: 'bg-white', accentColor: 'from-secondary-50', textColor: 'text-neutral-900' }
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
  
  // Abstract background SVG with modern, fluid shapes
  const abstractBackgroundSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="800" viewBox="0 0 1440 800" fill="none">
      <g opacity="0.2">
        <path d="M1086.65 237.47C1166.96 278.89 1242.29 341.29 1295.74 418.63C1349.19 495.96 1380.74 588.25 1355.24 662.55C1329.74 736.84 1247.19 793.14 1160.14 798.88C1073.09 804.63 981.54 759.81 897.43 723.05C813.33 686.29 736.68 657.59 644.48 628.39C552.28 599.19 444.53 569.5 354.93 516.95C265.33 464.41 193.88 389.01 180.98 310.52C168.08 232.03 213.73 150.45 281.13 105.45C348.53 60.45 437.68 52.03 533.08 42.53C628.48 33.03 730.13 22.45 820.33 55.83C910.53 89.22 989.28 166.59 1086.65 237.47Z" fill="url(#paint0_linear_3984_303)"/>
        <path d="M1177.42 462.78C1257.72 504.19 1333.05 566.6 1386.5 643.93C1439.95 721.27 1471.5 813.56 1446 887.85C1420.5 962.15 1337.95 1018.45 1250.9 1024.18C1163.86 1029.92 1072.3 985.11 988.2 948.35C904.1 911.59 827.45 882.89 735.25 853.69C643.05 824.49 535.3 794.8 445.7 742.25C356.1 689.7 284.65 614.31 271.75 535.82C258.85 457.33 304.5 375.75 371.9 330.75C439.3 285.75 528.45 277.32 623.85 267.83C719.25 258.34 820.9 247.75 911.1 281.13C1001.3 314.51 1080.05 391.89 1177.42 462.78Z" fill="url(#paint1_linear_3984_303)"/>
        <path d="M189.52 262.32C269.82 303.73 345.15 366.14 398.6 443.47C452.05 520.81 483.6 613.1 458.1 687.39C432.6 761.69 350.05 817.99 263 823.73C175.96 829.47 84.4 784.65 0.3 747.89C-83.8 711.13 -160.45 682.43 -252.65 653.23C-344.85 624.03 -452.6 594.34 -542.2 541.8C-631.8 489.24 -703.25 413.85 -716.15 335.36C-729.05 256.87 -683.4 175.29 -616 130.29C-548.6 85.29 -459.45 76.87 -364.05 67.37C-268.65 57.88 -167 47.29 -76.8 80.67C13.4 114.05 92.15 191.43 189.52 262.32Z" fill="url(#paint2_linear_3984_303)"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_3984_303" x1="768.097" y1="42.3147" x2="768.097" y2="798.997" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFA500" stop-opacity="0.2"/>
          <stop offset="1" stop-color="#FF6B00" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="paint1_linear_3984_303" x1="858.865" y1="267.618" x2="858.865" y2="1024.3" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E0E0E0"/>
          <stop offset="1" stop-color="#C7C7C7" stop-opacity="0.1"/>
        </linearGradient>
        <linearGradient id="paint2_linear_3984_303" x1="-129.033" y1="67.0533" x2="-129.033" y2="823.736" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFA500" stop-opacity="0.1"/>
          <stop offset="1" stop-color="#FF6B00" stop-opacity="0.03"/>
        </linearGradient>
      </defs>
    </svg>
  `;

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
    <div className="min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Hero Section with Avant-garde Split Design */}
      <div className="w-full h-screen relative flex flex-col md:flex-row overflow-hidden">
        {/* Static artistic background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-neutral-50 relative"
            style={{
              backgroundImage: `url("${backgroundDataUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Add subtle noise texture overlay */}
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-25"></div>
          </div>
        </div>
        
        {/* Dynamic color overlays - reduced visibility for better background viewing */}
        {bgThemes.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <div className={`w-full h-full ${slide.bgColor} bg-opacity-40 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${slide.accentColor} to-transparent opacity-30`}></div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/5 to-transparent"></div>
            </div>
          </div>
        ))}
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col md:flex-row h-full w-full justify-center">
          {/* Left content - removed conditional styling for dark theme */}
          <div className="w-full md:w-2/5 flex items-center justify-end p-6 md:pr-8">
            <div className="max-w-md">
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-8 text-neutral-900 transition-colors duration-1000">
                {['Elevate', 'Your', 'Surrounding.'].map((text, i) => (
                  <span 
                    key={i}
                    className={`block transition-all duration-1000 ease-out ${
                      i === 2 ? 'font-light' : ''
                    } ${
                      // Subtle transitions synchronized with poster change
                      activePoster % 3 === 0 ? 'text-neutral-900 transform translate-x-0' :
                      activePoster % 3 === 1 ? 'text-neutral-800 transform -translate-x-1' :
                      'text-secondary-900 transform translate-x-1'
                    }`}
                    style={{
                      transitionDelay: `${i * 200}ms`,
                      opacity: 0.9 + (i * 0.03),
                      transform: `perspective(1000px) 
                                 rotateY(${(activePoster % 3 - 1) * 0.5}deg) 
                                 rotateX(${(activePoster % 2) * 0.3}deg)
                                 translateY(${(activePoster % 4 - 1.5) * 1}px)`,
                    }}
                  >
                    {text}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-xl mb-12 text-neutral-600 transition-colors duration-1000">
                Elevate your surroundings .
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300"
                >
                  BROWSE STORE
                  <ArrowRight 
                    size={16} 
                    className="transform transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right content - Poster Slideshow */}
          <div className="w-full md:w-2/5 flex items-center justify-start p-6 md:pl-8 relative overflow-hidden">
            <div className="max-w-md w-full aspect-[3/4] relative">
              {/* Poster Slideshow */}
              <div className="relative w-full h-full overflow-hidden">
                {topSellingPosters.map((poster, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-out ${
                      activePoster === index 
                        ? 'opacity-100 transform scale-100' 
                        : 'opacity-0 transform scale-105'
                    }`}
                    style={{
                      zIndex: activePoster === index ? 10 : 0
                    }}
                  >
                    <div 
                      className="w-full h-full relative overflow-hidden shadow-lg"
                      onMouseMove={handlePosterHover}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 50%)'
                         }}>
                      </div>
                      
                      <img 
                        src={poster.image} 
                        alt={poster.name}
                        className="w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <span className="text-xl font-light tracking-wide text-white mb-2">
                          {poster.name}
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">₹{poster.price}</span>
                          <span className="text-xs text-white/70 px-2 py-0.5 border border-white/20">
                            {poster.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows - light background buttons only */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20">
                <button 
                  onClick={prevPoster}
                  className="p-3 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-all duration-300"
                  aria-label="Previous poster"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                <button 
                  onClick={nextPoster}
                  className="p-3 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-all duration-300"
                  aria-label="Next poster"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Slideshow indicators - light theme only */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {topSellingPosters.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (posterIntervalRef.current) {
                        clearInterval(posterIntervalRef.current);
                      }
                      setActivePoster(index);
                      posterIntervalRef.current = setInterval(() => {
                        setActivePoster(prev => (prev + 1) % topSellingPosters.length);
                      }, 4000); // Updated to 4 seconds
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activePoster === index 
                        ? 'bg-secondary-500 scale-125' 
                        : 'bg-neutral-300'
                    }`}
                    aria-label={`Go to poster ${index + 1}`}
                  />
                ))}
                {topSellingPosters.length > 5 && (
                  <span className="text-xs text-neutral-500">
                    +{topSellingPosters.length - 5}
                  </span>
                )}
              </div>
              
              {/* "Top selling" label - consistent light styling */}
              <div className="absolute -top-2 -right-2 z-20">
                <div className="px-4 py-1 text-xs tracking-wider bg-secondary-500 text-white">
                  TOP SELLING
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-10 bg-neutral-300 relative overflow-hidden">
            <div className="w-full h-1/2 bg-secondary-500 absolute animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Featured Collection - Staggered Grid */}
      <div id="collection" ref={collectionRef} className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className={`text-3xl md:text-5xl font-extralight tracking-tight mb-4 transition-all duration-1000 ${
                isInViewport.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Latest Arrivals
              </h2>
              <div className={`w-24 h-px bg-secondary-500 transition-all duration-1000 delay-300 ${
                isInViewport.collection ? 'opacity-100 scale-x-100 origin-left' : 'opacity-0 scale-x-0'
              }`}></div>
            </div>
            
            <p className={`text-neutral-600 max-w-md transition-all duration-1000 delay-500 ${
              isInViewport.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Discover our curated selection of premium minimalist designs, 
              handpicked for the aesthetically conscious.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`group transition-all duration-700 delay-${index * 100} cursor-pointer ${
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
                      className="self-start inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 text-xs tracking-wider transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
                    >
                      VIEW POSTER
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-light transition-colors duration-300 group-hover:text-secondary-500">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-light">₹{product.price}</span>
                    <span className="text-xs tracking-wider text-neutral-500 px-2 py-0.5 border-b border-neutral-200 group-hover:border-secondary-400 transition-colors duration-300">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center transition-all duration-1000 delay-800 ${
            isInViewport.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-neutral-900 text-sm tracking-wider hover:border-secondary-500 transition-all duration-300"
            >
              <span className="relative overflow-hidden">
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">VIEW ALL POSTERS</span>
                <span className="absolute inset-0 bg-secondary-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </span>
              <ChevronRight size={16} className="relative z-10 text-neutral-500 group-hover:text-white transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section - Interactive Cards */}
      <div id="features" ref={featuresRef} className="w-full py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary-50 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-50"></div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-24 max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl md:text-5xl font-extralight tracking-tight mb-6 transition-all duration-1000 ${
              isInViewport.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Why Choose Us?
            </h2>
            <p className={`text-neutral-600 text-lg transition-all duration-1000 delay-300 ${
              isInViewport.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Every detail crafted for those who appreciate minimalist design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                icon: <Award className="w-8 h-8 text-secondary-500" />,
                title: "PREMIUM QUALITY",
                description: "Museum-grade paper with archival inks ensures vibrant colors and sharp details that stand the test of time."
              },
              {
                icon: <Truck className="w-8 h-8 text-primary-600" />,
                title: "FAST DELIVERY",
                description: "Secure, tracked shipping throughout India with careful packaging to ensure your posters arrive in perfect condition."
              },
              {
                icon: <Shield className="w-8 h-8 text-neutral-800" />,
                title: "SATISFACTION GUARANTEED",
                description: "Shop with confidence through our secure payment system and hassle-free return policy if you're not completely satisfied."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`group bg-white p-10 hover:shadow-xl transition-all duration-500 relative overflow-hidden ${
                  isInViewport.features 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
                onMouseMove={handlePosterHover}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.8) 0%, transparent 60%)'
                     }}>
                </div>
                
                <div className="relative z-10">
                  <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 ease-out">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-base font-medium tracking-wider mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary-500 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section with Interactive Elements */}
      <div id="newsletter" ref={newsletterRef} className="w-full py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className={`relative bg-neutral-900 text-white p-16 transition-all duration-1000 ${
            isInViewport.newsletter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 via-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 delay-300 ${
                isInViewport.newsletter ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
                  Join Our Community
                </h2>
                <div className="w-16 h-px bg-secondary-500 mb-6"></div>
                <p className="text-neutral-400 text-base mb-0">
                  Subscribe for exclusive access to limited edition releases, 
                  design inspirations, and special offers.
                </p>
              </div>
              
              <div className={`transition-all duration-1000 delay-500 ${
                isInViewport.newsletter ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <form className="space-y-4">
                  <div className="group relative">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full bg-transparent text-white border-b border-neutral-700 focus:border-secondary-500 py-3 px-0 focus:outline-none placeholder:text-neutral-500 transition-all duration-300"
                    />
                    <button 
                      className="mt-8 w-full py-4 px-6 bg-white text-neutral-900 text-sm tracking-widest hover:bg-secondary-500 hover:text-white transition-all duration-300 flex items-center justify-center group"
                    >
                      <span>SUBSCRIBE</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </form>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-secondary-500"></div>
          </div>
        </div>
      </div>
      
      {/* Add custom styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scroll {
            animation: scroll 1.5s ease-in-out infinite;
          }
          
          /* Add noise texture */
          .bg-noise {
            background-image: url("data:image/png;base64,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");
          }
        `
      }} />
    </div>
  );
};

export default Home; 