'use client';

import Link from 'next/link';
// import { useUser } from '@supabase/auth-helpers-react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut } from 'lucide-react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Navbar() {
  // const user = useUser();
//   const cartCount = useSelector(() => state.cart.items.reduce((sum, i) => sum + i.quantity, 0));
//   const supabase = createClientComponentClient();

  const handleLogout = async () => {
    // await supabase.auth.signOut();
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🌵 Desert Drift Gems
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {/* {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )} */}
          </Link>
          {/* {user ? ( */}
            <div className="flex items-center gap-4">
              <Link href="/account">
                <User size={20} />
              </Link>
              {/* {user.user_metadata?.role === 'admin' && ( */}
                <Link href="/admin" className="text-sm">Admin</Link>
              {/* )} */}
              <Button variant="ghost" onClick={handleLogout} size="sm">
                <LogOut size={20} />
              </Button>
            </div>
          {/* ) : ( */}
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}