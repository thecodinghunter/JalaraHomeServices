
"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Wrench,
  CreditCard,
  Building,
  LogOut,
  HandPlatter,
  User,
  Megaphone,
} from "lucide-react";
import type { UserProfile } from "@/lib/types";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseProfile } from "@/supabase/auth/use-profile";
import { getSupabaseBrowserClient } from "@/supabase/client";

const useUserProfileMeta = (): { role: UserProfile['role'] | 'loading'; displayName: string | null; photoURL: string | null } => {
  const { profile, loading, user } = useSupabaseProfile();

  if (loading) {
    return { role: 'loading', displayName: null, photoURL: null };
  }

  return {
    role: profile?.role || 'customer',
    displayName: profile?.displayName || (user?.user_metadata?.full_name as string | undefined) || null,
    photoURL: (user?.user_metadata?.avatar_url as string | undefined) || null,
  };
};


const adminNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vendors", label: "Vendors", icon: Users },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
];

const vendorNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor/jobs", label: "My Jobs", icon: Building },
  { href: "/vendor/profile", label: "Profile", icon: User },
  { href: "/vendor/subscription", label: "Subscription", icon: CreditCard },
  { href: "/poster-generator", label: "Poster Generator", icon: Megaphone },
];

const customerNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/request-service", label: "Request Service", icon: HandPlatter },
  { href: "/my-requests", label: "My Requests", icon: Building },
];

const navItems = {
  admin: adminNav,
  vendor: vendorNav,
  customer: customerNav,
  loading: [],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { role, displayName, photoURL } = useUserProfileMeta();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push('/login');
    } catch {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: 'Please try again.',
      });
    }
  };

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary group-data-[collapsible=icon]:justify-center">
            <Image src="/logo.png" width={32} height={32} alt="Jalaram Home Service Logo" />
            <span className="group-data-[collapsible=icon]:hidden">Jalaram Service</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {(navItems[role] || []).map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={photoURL || "https://github.com/shadcn.png"} alt={displayName || "User"} />
            <AvatarFallback>{displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm truncate">{displayName || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Log out" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
