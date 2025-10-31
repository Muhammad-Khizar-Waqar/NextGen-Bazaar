'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import CheckoutSteps from '@/components/cart/CheckoutSteps';
import { motion } from 'framer-motion';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const stripePromise = loadStripe();

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutSteps cartItems={cartItems} />
      </Elements>
    </motion.div>
  );
}