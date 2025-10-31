'use client';
import { useUser } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateProfile } from '@/lib/actions'; // Server Action


export default function Profile() {
  const user = useUser();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: { fullName: user?.user_metadata?.full_name || '', email: user?.email || '' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: data.fullName } });
    if (error) toast.error(error.message);
    else {
      toast.success('Profile updated');
      reset(data);
    }
    setLoading(false);
  };

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 max-w-md"
    >
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" {...register('fullName')} className="input mt-1" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} className="input mt-1" disabled />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </motion.div>
  );
}