import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'You must be logged in to view order details' },
        { status: 401 }
      );
    }

    // Get payment intent ID from query params
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get('paymentIntentId');

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Find order by payment intent ID and user ID (for security)
    const order = await prisma.order.findFirst({
      where: {
        paymentIntentId,
        userId: session.user.id,
      },
      include: {
        orderItems: true,
        shippingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        paymentStatus: order.paymentStatus,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        items: order.orderItems,
        shippingAddress: order.shippingAddress,
      },
    });
  } catch (error) {
    console.error('Error fetching order by payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details', details: error.message },
      { status: 500 }
    );
  }
}