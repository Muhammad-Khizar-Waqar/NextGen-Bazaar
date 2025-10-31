import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">Page Not Found</p>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Gems
        </Button>
      </Link>
    </div>
  );
}