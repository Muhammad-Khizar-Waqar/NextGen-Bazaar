import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  { name: 'Rings', image: '/rings-placeholder.jpg', href: '/rings' },
  { name: 'Necklaces', image: '/necklaces-placeholder.jpg', href: '/necklaces' },
  { name: 'Earrings', image: '/earrings-placeholder.jpg', href: '/earrings' },
  { name: 'Bracelets', image: '/bracelets-placeholder.jpg', href: '/bracelets' },
  { name: 'Watches', image: '/watches-placeholder.jpg', href: '/watches' },
];

export default function CategoriesGrid() {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12 gold-text">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="p-0">
                  <Image src={cat.image} alt={cat.name} width={200} height={200} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}