'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { addToWishlist } from '@/store/wishlistSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image_url: string;
//   category: string;
// }

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow"
    >
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-2xl font-semibold text-gem-gold mb-4">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <div className="flex gap-2">
          <Button onClick={() => dispatch(addToCart(product))} size="sm" className="flex-1">
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <Button variant="ghost" size="sm" onClick={() => dispatch(addToWishlist(product.id))}>
            <Heart size={16} fill="currentColor" className="text-red-500" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}