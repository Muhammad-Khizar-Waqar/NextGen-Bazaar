import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe();
let webhookSecret = null;

export async function POST(req) {
  const body = await req.text();
//   const signature = null  headers().get('stripe-signature')!;
  const signature = null;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  const supabase = createClient();

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_id', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('stripe_id', failedIntent.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}