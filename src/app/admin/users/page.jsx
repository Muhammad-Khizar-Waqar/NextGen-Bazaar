import { createClient } from '@/lib/supabase';
import { DataTable } from '@/components/ui/table';
import { columns } from './user-columns'; // Columns for user list, with role edit

export default async function AdminUsers() {
  const supabase = createClient();
  const { data: users } = await supabase
    .from('users')
    .select(`
      id,
      auth.users (email),
      role
    `);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <DataTable columns={columns} data={users || []} />
    </div>
  );
}