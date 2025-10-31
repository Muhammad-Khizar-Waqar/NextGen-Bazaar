'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CartItem from '@/components/cart/CartItem';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center"
      >
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <Link href="/" className="btn-primary">Browse Gems</Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-right">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        </div>
        <Link href="/checkout" className="w-full block btn-primary text-center py-3 mt-4">
          Proceed to Checkout
        </Link>
      </div>
    </motion.div>
  );
}