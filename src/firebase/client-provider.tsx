'use client';
import { FirebaseProvider } from '@/firebase/provider';
import { ReactNode, useEffect, useState } from 'react';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // For server-side rendering, we don't want to initialize Firebase.
    // We'll just render the children, or nothing, until we're on the client.
    return null;
  }

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
