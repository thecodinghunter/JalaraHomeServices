'use client';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: any) => {
      if (process.env.NODE_ENV === 'development') {
        // In development, we want to see the rich error overlay.
        // We'll re-throw the error to let Next.js handle it.
        throw error;
      } else {
        // In production, show a user-friendly toast.
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
        });
        console.error(error); // Also log it for debugging
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
