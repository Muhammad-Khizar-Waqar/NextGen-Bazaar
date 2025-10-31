'use server';

import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'react-hot-toast'; // Client-side, but for server, use console

// Order Creation
export async function createOrder(_prevState, formData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const amount = parseFloat(formData.get('amount'));
    const stripeId = formData.get('stripe_id');
    const cartItemsStr = formData.get('cart_items');
    const cartItems = JSON.parse(cartItemsStr);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: amount / 100, // Cents to dollars
        stripe_id: stripeId,
        status: 'paid',
      })
      .select()
      .single();

    if (error) throw error;

    // Insert order items
    await supabase.from('order_items').insert(
      cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }))
    );

    // Update stock
    for (const item of cartItems) {
      const { data: prod } = await supabase.from('products').select('stock').eq('id', item.product_id).single();
      if (prod) {
        await supabase
          .from('products')
          .update({ stock: prod.stock - item.quantity })
          .eq('id', item.product_id);
      }
    }

    revalidatePath('/account/orders');
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, error: (error).message };
  }
}

// Product Schema and CRUD
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be positive'),
  image_url: z.string().url('Invalid URL').optional(),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
  category: z.string().optional(),
});

export async function createProduct(_prevState, formData) {
  try {
    const validatedFields = productSchema.safeParse(Object.fromEntries(formData));
    if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.user_metadata?.role !== 'admin') throw new Error('Admin only');

    const { error } = await supabase.from('products').insert(validatedFields.data);
    if (error) throw error;

    revalidatePath('/admin/products');
    redirect('/admin/products');
  } catch (error) {
    console.error('Product creation failed:', error);
    return { error: (error).message };
  }
}

export async function updateProduct(id, _prevState, formData) {
  try {
    const validatedFields = productSchema.safeParse(Object.fromEntries(formData));
    if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.user_metadata?.role !== 'admin') throw new Error('Admin only');

    const { error } = await supabase.from('products').update(validatedFields.data).eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/products');
    redirect('/admin/products');
  } catch (error) {
    console.error('Product update failed:', error);
    return { error: (error).message };
  }
}

export async function deleteProduct(id) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.user_metadata?.role !== 'admin') throw new Error('Admin only');

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/products');
  } catch (error) {
    console.error('Product deletion failed:', error);
    throw error;
  }
}

// Order Status Update
export async function updateOrderStatus(orderId, status) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.user_metadata?.role !== 'admin') throw new Error('Admin only');

    if (!['pending', 'paid', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      throw new Error('Invalid status');
    }

    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) throw error;

    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Order status update failed:', error);
    return { success: false, error: (error).message };
  }
}