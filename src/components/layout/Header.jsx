'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { selectCartItemsCount, toggleCart } from '../../store/slices/cartSlice';
import { selectIsAuthenticated, selectUser } from '../../store/slices/authSlice';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold text-purple-800">GemGlow</span>
              <span className="text-2xl font-light text-gray-700">Jewels</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-purple-600 transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-700 hover:text-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button 
              onClick={() => dispatch(toggleCart())}
              className="text-gray-700 hover:text-purple-600 transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <Link href="/account" className="text-gray-700 hover:text-purple-600 transition-colors">
                <div className="flex items-center space-x-1">
                  <span className="hidden sm:inline">{user?.name || 'Account'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </Link>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-purple-600 transition-colors">
                <div className="flex items-center space-x-1">
                  <span className="hidden sm:inline">Login</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-2"
          >
            <Link href="/products" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </motion.nav>
        )}
      </div>
    </header>
  );
}