// Custom form if not using Supabase UI
'use client';

import { useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// type LoginForm = {
//   email: string;
//   password: string;
// };

export default function AuthForm({ type = 'login' }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
//   const { register, handleSubmit } = useForm<LoginForm>();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { error } = type === 'login'
      ? await supabase.auth.signInWithPassword(data)
      : await supabase.auth.signUp(data);
    if (error) toast.error(error.message);
    else router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('email')} type="email" placeholder="Email" required />
      <Input {...register('password')} type="password" placeholder="Password" required />
      <Button type="submit" className="w-full">
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </Button>
    </form>
  );
}