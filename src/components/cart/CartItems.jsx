'use client';

import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { removeFromCart, updateQuantity } from '@/store/cartSlice'; // Add updateQuantity reducer

// interface CartItemType {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image_url: string;
// }

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white">
      <Image
        src={item.image_url}
        alt={item.name}
        width={80}
        height={80}
        className="object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
        >
          <Minus size={16} />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          disabled={item.quantity >= 99} // Assume max
        >
          <Plus size={16} />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
      <p className="text-right font-semibold">${subtotal.toFixed(2)}</p>
    </div>
  );
}