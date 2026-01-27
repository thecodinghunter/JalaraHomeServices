'use client';

import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import VendorDashboard from '@/components/dashboard/vendor-dashboard';
import CustomerDashboard from '@/components/dashboard/customer-dashboard';

export default function DashboardRedirectPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userProfileRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);


  useEffect(() => {
    if (!userLoading && !user) {
      // If not loading and no user, redirect to login
      router.push('/login');
    } else if (!userLoading && user && !user.emailVerified) {
      // If user exists but email not verified, redirect
      router.push('/verify-email');
    }
  }, [user, userLoading, router]);

  const loading = userLoading || profileLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2">Loading your dashboard...</p>
      </div>
    );
  }

  if (userProfile) {
    switch (userProfile.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        // Fallback for unknown roles, maybe to customer dashboard or an error page
        return <CustomerDashboard />;
    }
  }

  // Fallback while profile is loading or if something is wrong
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2">Loading your dashboard...</p>
    </div>
  );
}
