import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function OrderDetail({ params }) {
  const supabase = createClient();
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      id, status, total, created_at,
      order_items (
        id, quantity, price_at_purchase,
        products (name, image_url)
      )
    `)
    .eq('id', params.id)
    .single();

  if (error || !order) notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Items</h2>
        {order.order_items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border-b">
            <Image
              src={item.products.image_url}
              alt={item.products.name}
              width={80}
              height={80}
              className="object-cover rounded"
            />
            <div className="flex-1">
              <h3>{item.products.name}</h3>
              <p>Qty: {item.quantity} x ${item.price_at_purchase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}