import RegisterForm from '@/components/auth/register-form';
import { Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterCustomerPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center mb-8">
            <Image src="/logo.png" width={100} height={100} alt="Jalaram Home Service Logo" className="mb-4"/>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Create a Customer Account
            </h1>
            <p className="text-muted-foreground mt-2">
            Get access to reliable home services.
            </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
