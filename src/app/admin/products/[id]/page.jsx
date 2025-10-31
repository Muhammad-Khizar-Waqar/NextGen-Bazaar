import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProduct({ params }) {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();

  if (!product) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}