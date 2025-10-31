'use client';

import { useFormState } from 'react-dom';
import { createProduct, updateProduct } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Upload } from 'lucide-react';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   stock: number;
//   category: string;
// }

export default function ProductForm({ product }) {
  const [state, formAction] = useFormState(
    product ? (fd) => updateProduct(product.id, fd) : createProduct,
    { error: '' }
  );

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product?.description} />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" defaultValue={product?.price} required />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" defaultValue={product?.stock} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={product?.category} />
      </div>
      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input id="image_url" name="image_url" defaultValue={product?.image_url} />
        {product?.image_url && (
          <Image src={product.image_url} alt={product.name} width={100} height={100} className="mt-2" />
        )}
      </div>
      <Button type="submit" className="w-full">
        {product ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
}