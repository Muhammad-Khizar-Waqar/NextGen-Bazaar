import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-96 bg-gradient-to-br from-gold to-yellow-800 overflow-hidden">
      <Image
        src="/hero-jewelry-placeholder.jpg"  // Replace with actual hero image
        alt="Elegant jewelry collection"
        fill
        className="object-cover opacity-20"
      />
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="text-center text-white max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-4">Discover Timeless Elegance</h1>
          <p className="text-xl mb-8">Exquisite jewelry pieces crafted with passion and precision.</p>
          <div className="space-x-4">
            <Button size="lg" className="bg-white text-gold hover:bg-gray-100">Shop Collection</Button>
            <Button variant="outline" size="lg" className="border-white text-white">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}