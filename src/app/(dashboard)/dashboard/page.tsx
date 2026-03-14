'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import VendorDashboard from '@/components/dashboard/vendor-dashboard';
import CustomerDashboard from '@/components/dashboard/customer-dashboard';
import { useSupabaseProfile } from '@/supabase/auth/use-profile';

export default function DashboardRedirectPage() {
  const { user, profile, loading } = useSupabaseProfile();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // If not loading and no user, redirect to login
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-2">Loading your dashboard...</p>
      </div>
    );
  }

  if (profile) {
    switch (profile.role) {
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
