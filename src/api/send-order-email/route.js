import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(req) {
  try {
    const { userEmail, orderId } = await req.json();
    if (!userEmail || !orderId) {
      return NextResponse.json({ error: 'Missing email or order ID' }, { status: 400 });
    }

    await sendOrderConfirmation(userEmail, orderId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}