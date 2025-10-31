

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { createClient } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, DollarSign } from 'lucide-react';

// interface SalesData {
//   date: string;
//   sales: number;
//   orders: number;
// }

export default async function Dashboard() {
  const supabase = createClient();
  const { data: orders } = await supabase
    .from('orders')
    .select('total, created_at, status')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .eq('status', 'paid');

  const { data: usersCount } = await supabase.from('users').select('id', { count: 'exact', head: true });
  const { data: productsCount } = await supabase.from('products').select('id', { count: 'exact', head: true });

  const chartData = orders?.reduce((acc, order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.sales += order.total;
      existing.orders += 1;
    } else {
      acc.push({ date, sales: order.total, orders: 1 });
    }
    return acc;
  }, []) || [];

  const totalSales = orders?.reduce((sum, o) => sum + o.total, 0) || 0;
  const totalOrders = orders?.length || 0;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#D4AF37" name="Sales ($)" />
              <Bar dataKey="orders" fill="#F4E4BC" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}