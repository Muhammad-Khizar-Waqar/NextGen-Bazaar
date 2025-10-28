'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '../../store/slices/cartSlice';

export default function ProductCard({ product }) {
  const { id, name, price, image, category, inventoryQuantity, lowStockThreshold } = product;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  
  const isLowStock = inventoryQuantity <= lowStockThreshold && inventoryQuantity > 0;
  const isOutOfStock = inventoryQuantity <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      dispatch(addToCart({
        productId: id,
        name,
        price,
        image,
        quantity: 1,
        maxQuantity: inventoryQuantity
      }));
      dispatch(toggleCart());
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/products/${id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
          {/* Product Image */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-0 right-0 mx-auto w-4/5"
            >
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors ${
                  isOutOfStock 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-700 hover:bg-purple-800'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </motion.div>
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <div className="mb-1 text-xs text-gray-500">{category}</div>
            <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-purple-800">${price.toFixed(2)}</p>
              
              {/* Stock Indicator */}
              {isLowStock && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800"
                >
                  Only {inventoryQuantity} left
                </motion.div>
              )}
              {isOutOfStock && (
                <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  Out of Stock
                </div>
              )}
              {!isLowStock && !isOutOfStock && (
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  In Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}