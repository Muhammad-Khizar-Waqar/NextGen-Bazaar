'use client';

import { useForm } from 'react-hook-form';
import { CardElement, useElements, useStripe } from '@stripe/stripe-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { createOrder } from '@/lib/actions'; // Server Action
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

export default function CheckoutSteps({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useUser();
  const supabase = createClientComponentClient();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!user || !stripe || !elements) return;

    const amount = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100;

    const { client_secret } = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    }).then((r) => r.json());

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: user.email, address: { line1: data.address } },
      },
    });

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    const formData = new FormData();
    formData.append('amount', amount.toString());
    formData.append('stripe_id', result.paymentIntent.id);
    formData.append('cart_items', JSON.stringify(cartItems.map((i) => ({ product_id: i.product_id, quantity: i.quantity, price: i.price }))));

    const orderResult = await createOrder(formData);
    if (orderResult.success) {
      dispatch(clearCart());
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, orderId: orderResult.orderId }),
      });
      toast.success('Order placed successfully!');
      window.location.href = `/checkout/confirm?session_id=${result.paymentIntent.id}`;
    } else {
      toast.error(orderResult.error || 'Order creation failed');
    }
  };

  if (!user) return <div>Login required for checkout.</div>;

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <Label htmlFor="address">Shipping Address</Label>
        <Input id="address" {...register('address', { required: true })} placeholder="123 Desert St, Dune City" />
      </motion.div>
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Label>Payment Details</Label>
        <div className="p-3 border rounded-md">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
      </motion.div>
      <Button type="submit" className="w-full" disabled={!stripe}>
        Pay ${cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
      </Button>
    </motion.form>
  );
}