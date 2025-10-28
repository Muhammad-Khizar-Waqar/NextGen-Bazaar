'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../store/slices/cartSlice';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  // Get payment_intent from URL query params
  const paymentIntentId = searchParams.get('payment_intent');
  
  useEffect(() => {
    // Clear cart on successful order
    dispatch(clearCart());
    
    // Fetch order details if payment intent is available
    const fetchOrderDetails = async () => {
      if (!paymentIntentId) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/orders/by-payment-intent?paymentIntentId=${paymentIntentId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [paymentIntentId, dispatch]);
  
  // Redirect to home if accessed directly without payment intent
  useEffect(() => {
    if (!loading && !paymentIntentId) {
      router.push('/');
    }
  }, [loading, paymentIntentId, router]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-600 mx-auto"></div>
        <p className="text-lg">Loading your order details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mb-6 text-center text-gray-600">{error}</p>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mb-6 text-gray-600">Thank you for your purchase. Your order has been received.</p>
        </div>
        
        {order ? (
          <div className="mb-8">
            <div className="mb-6 rounded-md bg-gray-50 p-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-sm font-medium">{order.id}</p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-sm font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-sm font-medium capitalize">{order.status}</p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
            
            <h2 className="mb-3 text-lg font-medium">Order Items</h2>
            <div className="mb-6 rounded-md bg-gray-50 p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="mr-3 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.variantName && (
                        <p className="text-sm text-gray-500">{item.variantName}</p>
                      )}
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Your order has been confirmed. You will receive an email with your order details shortly.
            </p>
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          {order && (
            <Link
              href={`/account/orders/${order.id}`}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              View Order Details
            </Link>
          )}
          
          <Link
            href="/"
            className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}