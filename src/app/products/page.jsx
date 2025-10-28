'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ui/ProductCard';

// Mock data - will be replaced with API calls
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 1299.99,
    image: '/images/products/diamond-ring.jpg',
    category: 'Rings',
    inventoryQuantity: 8,
    lowStockThreshold: 5
  },
  {
    id: '2',
    name: 'Sapphire Pendant Necklace',
    price: 899.99,
    image: '/images/products/sapphire-necklace.jpg',
    category: 'Necklaces',
    inventoryQuantity: 12,
    lowStockThreshold: 5
  },
  {
    id: '3',
    name: 'Emerald Drop Earrings',
    price: 749.99,
    image: '/images/products/emerald-earrings.jpg',
    category: 'Earrings',
    inventoryQuantity: 3,
    lowStockThreshold: 5
  },
  {
    id: '4',
    name: 'Gold Tennis Bracelet',
    price: 1499.99,
    image: '/images/products/gold-bracelet.jpg',
    category: 'Bracelets',
    inventoryQuantity: 0,
    lowStockThreshold: 5
  },
  {
    id: '5',
    name: 'Pearl Stud Earrings',
    price: 299.99,
    image: '/images/products/pearl-earrings.jpg',
    category: 'Earrings',
    inventoryQuantity: 15,
    lowStockThreshold: 5
  },
  {
    id: '6',
    name: 'Ruby Engagement Ring',
    price: 2499.99,
    image: '/images/products/ruby-ring.jpg',
    category: 'Rings',
    inventoryQuantity: 2,
    lowStockThreshold: 5
  }
];

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

export default function ProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply in-stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inventoryQuantity > 0);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, inStockOnly, searchQuery]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Our Collection</h1>
      
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Category Filter */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 font-medium">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Range Filter */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 font-medium">Price Range</h3>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-purple-600"
            />
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        {/* In Stock Filter */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 font-medium">Availability</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="h-4 w-4 rounded border-gray-300 accent-purple-600"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
        
        {/* Search */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-3 font-medium">Search</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium text-gray-700">No products found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}