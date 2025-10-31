'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSearchParams } from 'next/navigation';

export default function InfiniteProducts({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({ threshold: 0 });
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();

  const query = supabase
    .from('products')
    .select('*')
    .range(page * 10, (page + 1) * 10 - 1)
    .ilike('name', `%${searchParams.get('search') || ''}%`);

  if (searchParams.get('category')) {
    query.eq('category');
  }

  useEffect(() => {
    if (inView && hasMore) {
      query.then(({ data, error, count }) => {
        if (error) console.error(error);
        if (!data || data.length === 0) setHasMore(false);
        else setProducts((prev) => [...prev, ...data]);
        setPage((p) => p + 1);
      });
    }
  }, [inView, page, hasMore, searchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {hasMore && <div ref={ref} className="col-span-full text-center py-8">Loading more...</div>}
    </div>
  );
}