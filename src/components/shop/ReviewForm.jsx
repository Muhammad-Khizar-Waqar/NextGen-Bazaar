'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assume shadcn textarea
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).optional(),
});

// type ReviewForm = z.infer<typeof schema>;

export default function ReviewForm({ productId }) {
  const supabase = createClientComponentClient();
  const user = useUser();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('Login required to review');
      return;
    }

    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_id: user.id,
      rating: data.rating,
      comment: data.comment,
    });

    if (error) toast.error(error.message);
    else {
      toast.success('Review submitted!');
      reset();
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mt-6 p-4 border rounded-lg"
    >
      <h3 className="font-semibold mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="number"
          {...register('rating', { valueAsNumber: true })}
          placeholder="Rating (1-5)"
          min={1}
          max={5}
          required
        />
        <Textarea
          {...register('comment')}
          placeholder="Your thoughts on this gem..."
        />
        <Button type="submit" className="w-full">Submit Review</Button>
      </form>
    </motion.div>
  );
}