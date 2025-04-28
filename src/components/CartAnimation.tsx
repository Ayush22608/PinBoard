import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartAnimationProps {
  productImage: string;
  startPosition: { x: number; y: number };
  onComplete: () => void;
}

const CartAnimation: React.FC<CartAnimationProps> = ({
  productImage,
  startPosition,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            position: 'fixed',
            left: startPosition.x,
            top: startPosition.y,
            width: 100,
            height: 100,
            zIndex: 50,
          }}
          animate={{
            position: 'fixed',
            left: 'calc(100% - 100px)',
            top: 20,
            width: 30,
            height: 30,
            opacity: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="pointer-events-none"
        >
          <img
            src={productImage}
            alt="Flying product"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartAnimation; 