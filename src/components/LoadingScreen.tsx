import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Allow the final animations to play before completing
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    
    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative flex flex-col items-center justify-center h-screen">
          {/* Logo Animation */}
          <motion.div 
            className="mb-16 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 bg-secondary-500 rounded-sm"
                  animate={{ rotate: [45, 0, -12] }}
                  transition={{ 
                    duration: 2, 
                    times: [0, 0.7, 1],
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-3 left-2 w-3 h-3 bg-white rounded-full z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
              <motion.span 
                className="text-4xl font-display tracking-wider ml-6 text-neutral-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Pin<span className="font-light tracking-tight">Board</span>
              </motion.span>
            </div>
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-neutral-200 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-secondary-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          {/* Loading Text */}
          <motion.p 
            className="mt-4 text-sm text-neutral-500 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress === 100 ? "Ready" : "Loading your aesthetic experience..."}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 