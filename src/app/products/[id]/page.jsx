'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '../../../store/slices/cartSlice';

// Mock data - will be replaced with API calls
const MOCK_PRODUCT = {
  id: '1',
  name: 'Diamond Eternity Ring',
  price: 1299.99,
  description: 'This stunning diamond eternity ring features 2 carats of brilliant-cut diamonds set in 18k white gold. The perfect symbol of never-ending love and commitment.',
  images: [
    '/images/products/diamond-ring.jpg',
    '/images/products/diamond-ring-2.jpg',
    '/images/products/diamond-ring-3.jpg',
  ],
  category: 'Rings',
  variants: [
    { id: 'v1', name: 'Size 5', inventoryQuantity: 3, lowStockThreshold: 5 },
    { id: 'v2', name: 'Size 6', inventoryQuantity: 8, lowStockThreshold: 5 },
    { id: 'v3', name: 'Size 7', inventoryQuantity: 0, lowStockThreshold: 5 },
  ],
  reviews: [
    { id: 'r1', user: 'Sarah J.', rating: 5, comment: 'Absolutely gorgeous! The diamonds sparkle beautifully.' },
    { id: 'r2', user: 'Michael T.', rating: 4, comment: 'Very high quality, my wife loves it.' },
  ],
  material: '18k White Gold',
  collection: 'Eternity Collection',
};

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = MOCK_PRODUCT; // In real app, fetch product by ID
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  
  const isLowStock = selectedVariant.inventoryQuantity <= selectedVariant.lowStockThreshold && selectedVariant.inventoryQuantity > 0;
  const isOutOfStock = selectedVariant.inventoryQuantity <= 0;
  
  const handleAddToCart = () => {
    if (!isOutOfStock && quantity <= selectedVariant.inventoryQuantity) {
      dispatch(addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: product.price,
        image: product.images[0],
        quantity,
        maxQuantity: selectedVariant.inventoryQuantity
      }));
      dispatch(toggleCart());
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-purple-600 hover:text-purple-800">
          ← Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="relative mb-4 h-96 w-full overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-purple-600' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-2 text-sm text-gray-500">{product.category}</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mb-6 text-2xl font-semibold text-purple-800">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h3 className="mb-2 font-medium">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="mb-2 font-medium">Details</h3>
            <ul className="list-inside list-disc text-gray-700">
              <li>Material: {product.material}</li>
              <li>Collection: {product.collection}</li>
            </ul>
          </div>
          
          {/* Variants */}
          <div className="mb-6">
            <h3 className="mb-2 font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={variant.inventoryQuantity === 0}
                  className={`rounded-md px-4 py-2 text-sm ${
                    selectedVariant.id === variant.id
                      ? 'bg-purple-600 text-white'
                      : variant.inventoryQuantity === 0
                      ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {isLowStock && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="rounded-md bg-amber-100 px-3 py-2 text-amber-800"
              >
                Low Stock: Only {selectedVariant.inventoryQuantity} left
              </motion.div>
            )}
            {isOutOfStock && (
              <div className="rounded-md bg-red-100 px-3 py-2 text-red-800">
                Out of Stock
              </div>
            )}
            {!isLowStock && !isOutOfStock && (
              <div className="rounded-md bg-green-100 px-3 py-2 text-green-800">
                In Stock: {selectedVariant.inventoryQuantity} available
              </div>
            )}
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-2 font-medium">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock}
                className="rounded-l-md border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={selectedVariant.inventoryQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(selectedVariant.inventoryQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
                disabled={isOutOfStock}
                className="w-16 border-y border-gray-300 px-3 py-2 text-center disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                onClick={() => setQuantity(Math.min(selectedVariant.inventoryQuantity, quantity + 1))}
                disabled={isOutOfStock || quantity >= selectedVariant.inventoryQuantity}
                className="rounded-r-md border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`mb-6 w-full rounded-md px-6 py-3 text-white ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          {/* Wishlist Button */}
          <button className="mb-8 flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Add to Wishlist
          </button>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
        
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-lg bg-white p-4 shadow">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">{review.user}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}