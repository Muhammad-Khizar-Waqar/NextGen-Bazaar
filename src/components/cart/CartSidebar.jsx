'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartIsOpen, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  setCartOpen 
} from '../../store/slices/cartSlice';

export default function CartSidebar() {
  const isOpen = useSelector(selectCartIsOpen);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  
  // Close cart when pressing escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(setCartOpen(false));
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, dispatch]);
  
  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const handleRemoveItem = (productId, variantId) => {
    dispatch(removeFromCart({ productId, variantId }));
  };
  
  const handleUpdateQuantity = (productId, variantId, quantity, maxQuantity) => {
    const newQuantity = Math.min(Math.max(1, quantity), maxQuantity);
    dispatch(updateQuantity({ productId, variantId, quantity: newQuantity }));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };
  
  const sidebar = {
    open: { x: 0, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
    closed: { x: '100%', transition: { type: 'tween', ease: 'easeIn', duration: 0.3 } },
  };
  
  const overlay = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlay}
            onClick={handleCloseCart}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
          />
          
          {/* Cart Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebar}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
                <button
                  onClick={handleCloseCart}
                  className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                    <p className="mt-1 text-gray-500">Add items to get started</p>
                    <button
                      onClick={handleCloseCart}
                      className="mt-6 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-gray-200"
                  >
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.li
                          key={`${item.productId}-${item.variantId || 'default'}`}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex py-4"
                        >
                          {/* Product Image */}
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              {item.variantName && (
                                <p className="mt-1 text-sm text-gray-500">{item.variantName}</p>
                              )}
                            </div>
                            
                            <div className="flex flex-1 items-end justify-between text-sm">
                              {/* Quantity */}
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity - 1, item.maxQuantity)}
                                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity + 1, item.maxQuantity)}
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => handleRemoveItem(item.productId, item.variantId)}
                                className="font-medium text-purple-600 hover:text-purple-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </div>
              
              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  
                  <div className="mt-4 space-y-2">
                    <Link
                      href="/checkout"
                      onClick={handleCloseCart}
                      className="flex w-full items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700"
                    >
                      Checkout
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}