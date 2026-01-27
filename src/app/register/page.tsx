import { User, Wrench } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center mb-6">
            <Image src="/logo.png" width={120} height={120} alt="Jalaram Home Service Logo" className="mb-2"/>
            <p className="text-muted-foreground mt-2">
            Are you a customer or a service provider?
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/register/customer">
                <Card className="text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                    <CardHeader className="p-6 flex flex-col items-center justify-center">
                        <User className="w-10 h-10 text-primary mb-4" />
                        <CardTitle className="mb-1 text-xl">I'm a Customer</CardTitle>
                        <CardDescription className="text-sm">Looking for home services.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <Link href="/register/vendor">
                 <Card className="text-center hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                    <CardHeader className="p-6 flex flex-col items-center justify-center">
                        <Wrench className="w-10 h-10 text-primary mb-4" />
                        <CardTitle className="mb-1 text-xl">I'm a Vendor</CardTitle>
                        <CardDescription className="text-sm">Ready to offer my services.</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>

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
