'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 1299.99,
    image: '/file.svg',
    category: 'Rings',
    inventoryQuantity: 8,
    lowStockThreshold: 5,
  },
  {
    id: '2',
    name: 'Sapphire Pendant Necklace',
    price: 899.99,
    image: '/globe.svg',
    category: 'Necklaces',
    inventoryQuantity: 12,
    lowStockThreshold: 5,
  },
  {
    id: '3',
    name: 'Pearl Drop Earrings',
    price: 499.99,
    image: '/window.svg',
    category: 'Earrings',
    inventoryQuantity: 3,
    lowStockThreshold: 5,
  },
  {
    id: '4',
    name: 'Gold Tennis Bracelet',
    price: 1599.99,
    image: '/file.svg',
    category: 'Bracelets',
    inventoryQuantity: 5,
    lowStockThreshold: 5,
  },
];

// Mock data for categories
const categories = [
  { id: '1', name: 'Necklaces', image: '/file.svg' },
  { id: '2', name: 'Rings', image: '/globe.svg' },
  { id: '3', name: 'Earrings', image: '/window.svg' },
  { id: '4', name: 'Bracelets', image: '/file.svg' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-purple-900 to-indigo-800 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Exquisite Jewelry for Every Occasion</h1>
            <p className="text-xl md:text-2xl mb-8">Discover our handcrafted collection of luxury jewelry pieces.</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link 
                href="/products" 
                className="bg-white text-purple-900 px-8 py-3 rounded-md font-semibold text-lg hover:bg-purple-100 transition-colors inline-block"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular jewelry pieces, handcrafted with the finest materials.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors px-6 py-2 rounded-md font-medium inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our extensive collection of fine jewelry by category.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <Link href={`/products?category=${category.name.toLowerCase()}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Read testimonials from our satisfied customers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Doe</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The diamond ring I purchased exceeded my expectations. The craftsmanship is impeccable, and it arrived beautifully packaged. I'll definitely be shopping here again!"</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Smith</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"I bought a necklace for my wife's birthday, and she absolutely loves it! The quality is outstanding, and the customer service was excellent. Highly recommend!"</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl">
                  EJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The earrings I ordered are stunning! They arrived quickly and were even more beautiful in person. The attention to detail is remarkable. Will definitely be a returning customer!"</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}