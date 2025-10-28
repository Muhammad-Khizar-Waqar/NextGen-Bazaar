import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to create a payment intent' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { items, shippingInfo } = body;
    
    if (!items || !items.length || !shippingInfo) {
      return NextResponse.json(
        { error: 'Missing required information' },
        { status: 400 }
      );
    }
    
    // Calculate order amount
    let amount = 0;
    const lineItems = [];
    
    // Fetch product details from database to verify prices
    const productIds = items.map(item => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include: {
        variants: true
      }
    });
    
    // Map products for verification
    const productMap = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
    
    // Verify and calculate total
    for (const item of items) {
      const product = productMap[item.id];
      
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.id}` },
          { status: 400 }
        );
      }
      
      let price = product.price;
      
      // If variant is specified, verify and use variant price
      if (item.variantId) {
        const variant = product.variants.find(v => v.id === item.variantId);
        if (!variant) {
          return NextResponse.json(
            { error: `Variant not found: ${item.variantId}` },
            { status: 400 }
          );
        }
        price = variant.price || price;
      }
      
      // Check inventory
      if (product.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }
      
      const itemTotal = price * item.quantity;
      amount += itemTotal;
      
      lineItems.push({
        productId: product.id,
        variantId: item.variantId || null,
        name: product.name,
        price: price,
        quantity: item.quantity,
        total: itemTotal
      });
    }
    
    // Add shipping cost
    const shippingCost = 999; // $9.99
    amount += shippingCost;
    
    // Add tax (7%)
    const taxAmount = Math.round(amount * 0.07);
    amount += taxAmount;
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Stripe expects amount in cents
      currency: 'usd',
      metadata: {
        userId: session.user.id,
        email: session.user.email,
        shippingInfo: JSON.stringify(shippingInfo),
        items: JSON.stringify(lineItems)
      }
    });
    
    // Create a temporary order record
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        total: amount / 100, // Convert back to dollars for DB
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        shippingMethod: 'Standard',
        shippingCost: shippingCost / 100,
        tax: taxAmount / 100,
        paymentIntentId: paymentIntent.id,
        items: {
          create: lineItems.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.total
          }))
        }
      }
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your payment' },
      { status: 500 }
    );
  }
}