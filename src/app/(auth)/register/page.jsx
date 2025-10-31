import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Register() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/');
    });
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-gem-gold">Join Desert Drift Gems</h1>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'email']}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </div>
  );
}