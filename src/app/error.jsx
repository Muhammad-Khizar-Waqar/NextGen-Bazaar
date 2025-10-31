'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    toast.error(error.message || 'An unexpected error occurred');
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <div className="space-x-4">
        <Button onClick={() => router.push('/')}>Go Home</Button>
        <Button variant="outline" onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}