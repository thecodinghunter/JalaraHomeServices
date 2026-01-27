
"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-6">A verification email has been sent to your email address. Please check your inbox and verify your email before continuing.</p>
        <Button onClick={() => router.push('/login')}>Go to Login</Button>
      </div>
    </div>
  );
}
