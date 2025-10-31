'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      toast.error('Invalid session');
      router.push('/cart');
    } else {
      toast.success('Order confirmed! Check your email.');
    }
  }, [sessionId, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen text-center"
    >
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">Your desert gems are on their way. Thank you for shopping with us.</p>
      <button onClick={() => router.push('/account/orders')} className="btn-primary">
        View Orders
      </button>
    </motion.div>
  );
}