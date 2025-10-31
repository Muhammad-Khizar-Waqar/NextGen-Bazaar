'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min
    },
  },
});

export function Providers({ children }) {
  const supabase = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </SessionContextProvider>
  );
}