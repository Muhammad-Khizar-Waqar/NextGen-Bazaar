'use client';

import { Toaster as Sonner } from 'sonner';

export default function ToastProvider() {
  return <Sonner position="top-right" richColors toastOptions={{ duration: 4000 }} />;
}