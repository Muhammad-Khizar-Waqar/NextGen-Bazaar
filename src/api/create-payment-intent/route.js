import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const stripe = new Stripe();

export async function POST(req) {
  if (!req.body) return NextResponse.json({ error: 'No body' }, { status: 400 });

  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent failed:', error);
    return NextResponse.json({ error: 'Payment setup failed' }, { status: 500 });
  }
}