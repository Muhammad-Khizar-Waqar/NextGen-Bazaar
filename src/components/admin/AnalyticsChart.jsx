'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

export default function AnalyticsChart({ data }) {
  return (
    <Card>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#D4AF37" />
            <Bar dataKey="orders" fill="#F4E4BC" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}