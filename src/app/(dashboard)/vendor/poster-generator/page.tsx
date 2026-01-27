'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page is now a redirect to the unified, public poster generator.
export default function RedirectToPosterGenerator() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/poster-generator');
  }, [router]);
  
  return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
  );
}
