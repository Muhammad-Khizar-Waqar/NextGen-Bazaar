import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


export default function ProductCard({ product }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-serif gold-text">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{product.category}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div>
          <p className="text-xl font-bold">${product.price}</p>
          {product.discount && <p className="text-sm text-gray-500 line-through">${(product.price * 1.1).toFixed(2)}</p>}
        </div>
        <Button className="bg-gold text-white hover:bg-dark-gold">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}