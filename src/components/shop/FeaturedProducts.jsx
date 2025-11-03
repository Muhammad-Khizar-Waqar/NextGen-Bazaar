'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  { id: 1, name: 'Rose Gold Diamond Ring', price: 96.40, image: '/ring-placeholder.jpg', category: 'Rings', discount: 5 },
  { id: 2, name: 'Golden Hoops', price: 68.00, image: '/hoops-placeholder.jpg', category: 'Earrings' },
  { id: 3, name: 'Dual Chain Necklace', price: 79.20, image: '/necklace-placeholder.jpg', category: 'Necklaces', discount: 1 },
  { id: 4, name: 'Classic Gold Bracelet', price: 78.90, image: '/bracelet-placeholder.jpg', category: 'Bracelets' },
];

export default function FeaturedProducts() {
  const [current, setCurrent] = useState(0);
  const visibleProducts = featuredProducts.slice(current, current + 4);

  const nextSlide = () => setCurrent((prev) => (prev + 4) % featuredProducts.length);
  const prevSlide = () => setCurrent((prev) => (prev - 4 + featuredProducts.length) % featuredProducts.length);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif gold-text">Featured Collection</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevSlide}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={nextSlide}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}