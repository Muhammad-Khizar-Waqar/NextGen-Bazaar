'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    supabase.from('products').select('category').then(({ data }) => {
      const uniqueCats = [...new Set(data?.map((p) => p.category).filter(Boolean))];
      setCategories(uniqueCats);
    });
  }, []);

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    return params.toString();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString('search', search)}`);
  };

  const clearFilters = () => {
    router.push(pathname);
    setSearch('');
    setCategory('');
  };

  return (
    <aside className="space-y-6">
      <h2 className="text-xl font-bold">Filters</h2>
      <form onSubmit={handleSearch} className="space-y-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <Button type="submit" variant="outline" className="w-full">
          Search
        </Button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <Select value={category} onValueChange={(val) => {
          setCategory(val);
          router.push(`${pathname}?${createQueryString('category', val)}`);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {(search || category) && (
        <Button variant="ghost" onClick={clearFilters} className="w-full flex items-center gap-2">
          <X size={16} />
          Clear Filters
        </Button>
      )}
    </aside>
  );
}