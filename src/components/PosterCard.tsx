import React from 'react';
import { Link } from 'react-router-dom';
import { Poster } from '../types/poster';
import CloudinaryImage from './common/CloudinaryImage';

interface PosterCardProps {
  poster: Poster;
  className?: string;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster, className = '' }) => {
  return (
    <Link 
      to={`/poster/${poster.id}`}
      className={`block group ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:shadow-lg">
        <div className="aspect-[3/4] w-full">
          <CloudinaryImage
            publicId={poster.imageUrl}
            alt={poster.title}
            width={600}
            height={800}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">{poster.title}</h3>
            <p className="text-sm opacity-90">${poster.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PosterCard; 