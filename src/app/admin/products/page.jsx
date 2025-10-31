import { createClient } from '@/lib/supabase';
import { DataTable } from '@/components/ui/table'; // shadcn table
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import { columns } from './columns'; // Define columns for table

export default async function AdminProducts() {
  const supabase = createClient();
  const { data: products } = await supabase.from('products').select('*');

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products || []} />
      {/* Inline ProductForm for quick add, or link to form page */}
      <ProductForm />
    </div>
  );
}