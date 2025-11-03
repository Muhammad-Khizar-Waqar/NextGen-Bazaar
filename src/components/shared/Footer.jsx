import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif mb-4 gold-text">Jewelry Elegance</h3>
            <p className="text-sm mb-4">Discover timeless pieces for every occasion.</p>
            <div className="flex space-x-4">
              <Link href="#"><Facebook className="h-5 w-5" /></Link>
              <Link href="#"><Instagram className="h-5 w-5" /></Link>
              <Link href="#"><Twitter className="h-5 w-5" /></Link>
              <Link href="#"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rings">Rings</Link></li>
              <li><Link href="/necklaces">Necklaces</Link></li>
              <li><Link href="/earrings">Earrings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for updates.</p>
            <div className="flex">
              <input placeholder="Email" className="flex-1 px-3 py-2 text-black rounded-l-md" />
              <button className="bg-gold px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
        <Separator className="bg-gray-700 my-8" />
        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2025 Jewelry Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}