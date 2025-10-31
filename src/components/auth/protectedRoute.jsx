'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@supabase/auth-helpers-react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (adminOnly && user.user_metadata?.role !== 'admin') {
      router.push('/');
    }
  }, [user, router, adminOnly]);

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  return <>{children}</>;
}