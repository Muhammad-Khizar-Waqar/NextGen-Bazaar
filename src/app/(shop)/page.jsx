import { createClient } from '@/lib/supabase';
import InfiniteProducts from '@/components/shop/InfiniteProducts';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { Suspense } from 'react';

export const metadata = {
  title: 'Desert Drift Gems - Premium Crystals & Jewelry',
  description: 'Discover rare desert gems with fast shipping worldwide.',
};

export default async function Shop() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(10)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto p-4 grid lg:grid-cols-4 gap-8 min-h-screen">
      <FilterSidebar />
      <main className="lg:col-span-3">
        <Suspense fallback={<div className="text-center py-8">Loading desert treasures...</div>}>
          <InfiniteProducts initialProducts={products || []} />
        </Suspense>
      </main>
    </div>
  );
}