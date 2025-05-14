import React, { useState, useEffect } from 'react';
import { Tag, X } from 'lucide-react';

interface AnnouncementBarProps {
  onClose: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Optional: Add animation effect to make the coupon code more noticeable
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-secondary-500 text-white py-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Tag size={16} className="mr-2" />
          <p className="text-sm text-center">
            <span className="font-semibold">SHIP3FREE:</span> 
            <span className={`mx-1 ${isAnimating ? 'animate-pulse' : ''}`}>
              Free shipping on orders of 3+ posters!
            </span>
            <span className="hidden sm:inline ml-2 text-white/80 text-xs">Use code at checkout</span>
          </p>
          <button 
            onClick={handleClose}
            className="absolute right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar; 