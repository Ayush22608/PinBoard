import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Poster {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface PosterCarouselProps {
  posters: Poster[];
}

const PosterCarousel: React.FC<PosterCarouselProps> = ({ posters }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % posters.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + posters.length) % posters.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create a circular array of posters (3 sets to ensure smooth infinite scroll)
  const displayPosters = [...posters, ...posters, ...posters];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex items-center justify-center">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel container */}
        <div className="relative w-full max-w-[1800px] mx-auto px-16 overflow-hidden">
          <div 
            ref={carouselRef}
            className="relative h-[500px] transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${-activeIndex * 500}px)`,
            }}
          >
            <div className="flex items-center justify-center">
              {displayPosters.map((poster, index) => {
                const distanceFromCenter = Math.abs(index - (posters.length + activeIndex));
                const isActive = distanceFromCenter === 0;
                const isAdjacent = distanceFromCenter === 1;

                return (
                  <div
                    key={`${poster.id}-${index}`}
                    className={`transition-all duration-300 ease-in-out mx-6 ${
                      isActive
                        ? 'scale-110 z-20'
                        : isAdjacent
                        ? 'scale-85 z-10'
                        : 'scale-70 z-0'
                    }`}
                  >
                    <div className="relative group">
                      <div className="w-[300px] h-[420px] overflow-hidden rounded-lg shadow-lg">
                        <img
                          src={poster.image}
                          alt={poster.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                          <h3 className="text-lg font-medium">{poster.name}</h3>
                          <p className="text-sm">₹{poster.price}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PosterCarousel; 