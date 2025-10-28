import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    // Find the order with this payment intent
    const order = await prisma.order.findFirst({
      where: { paymentIntentId: paymentIntent.id },
    });

    if (!order) {
      console.error(`No order found for payment intent: ${paymentIntent.id}`);
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'paid',
        status: 'processing',
        updatedAt: new Date(),
      },
    });

    // Create a payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: 'succeeded',
        paymentMethod: paymentIntent.payment_method_types[0],
      },
    });

    console.log(`Order ${order.id} marked as paid`);
  } catch (error) {
    console.error('Error handling payment_intent.succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  try {
    // Find the order with this payment intent
    const order = await prisma.order.findFirst({
      where: { paymentIntentId: paymentIntent.id },
    });

    if (!order) {
      console.error(`No order found for payment intent: ${paymentIntent.id}`);
      return;
    }

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'failed',
        status: 'payment_failed',
        updatedAt: new Date(),
      },
    });

    // Restore inventory for failed payment
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
    });

    for (const item of orderItems) {
      if (item.variantId) {
        // Restore variant stock
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      } else {
        // Restore product stock
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    console.log(`Order ${order.id} marked as payment_failed`);
  } catch (error) {
    console.error('Error handling payment_intent.payment_failed:', error);
  }
}

async function handleChargeRefunded(charge) {
  try {
    // Find the payment intent associated with this charge
    const paymentIntentId = charge.payment_intent;
    
    // Find the order with this payment intent
    const order = await prisma.order.findFirst({
      where: { paymentIntentId },
    });

    if (!order) {
      console.error(`No order found for payment intent: ${paymentIntentId}`);
      return;
    }

    // Check if it's a full refund
    const isFullRefund = charge.amount_refunded === charge.amount;

    // Update order status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: isFullRefund ? 'refunded' : 'partially_refunded',
        status: isFullRefund ? 'refunded' : 'partially_refunded',
        updatedAt: new Date(),
      },
    });

    // Create a refund record
    await prisma.refund.create({
      data: {
        orderId: order.id,
        paymentIntentId,
        amount: charge.amount_refunded / 100, // Convert from cents
        currency: charge.currency,
        reason: charge.refunds.data[0]?.reason || 'unknown',
        isFullRefund,
      },
    });

    // If it's a full refund, restore inventory
    if (isFullRefund) {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
      });

      for (const item of orderItems) {
        if (item.variantId) {
          // Restore variant stock
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        } else {
          // Restore product stock
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }
    }

    console.log(`Order ${order.id} marked as ${isFullRefund ? 'refunded' : 'partially_refunded'}`);
  } catch (error) {
    console.error('Error handling charge.refunded:', error);
  }
}