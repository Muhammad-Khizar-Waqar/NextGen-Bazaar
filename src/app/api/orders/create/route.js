import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to create an order' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { items, shippingInfo, paymentIntentId, paymentStatus } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items provided' },
        { status: 400 }
      );
    }

    if (!shippingInfo) {
      return NextResponse.json(
        { error: 'Shipping information is required' },
        { status: 400 }
      );
    }

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Calculate order totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingCost = 9.99;
    const taxRate = 0.07;
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        paymentIntentId,
        paymentStatus: paymentStatus || 'pending',
        status: 'processing',
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        shippingAddress: {
          create: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zipCode,
            country: shippingInfo.country,
            phone: shippingInfo.phone,
            email: shippingInfo.email,
          },
        },
        orderItems: {
          create: items.map((item) => ({
            productId: item.id,
            variantId: item.variantId || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            variantName: item.variantName || null,
          })),
        },
      },
      include: {
        shippingAddress: true,
        orderItems: true,
      },
    });

    // Update product inventory (decrement stock)
    for (const item of items) {
      if (item.variantId) {
        // Update variant stock
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      } else {
        // Update product stock
        await prisma.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    // Clear user's cart after successful order
    await prisma.cart.update({
      where: { userId: session.user.id },
      data: {
        items: {
          deleteMany: {},
        },
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        total: order.total,
        items: order.orderItems,
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}