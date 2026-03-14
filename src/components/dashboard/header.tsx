"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseProfile } from "@/supabase/auth/use-profile"
import { getSupabaseBrowserClient } from "@/supabase/client"

const pathToTitle: { [key: string]: string | ((pathname: string) => string) } = {
    '/dashboard': 'Dashboard',
    '/admin/vendors': 'Vendor Management',
    '/admin/services': 'Service Categories',
    '/admin/subscriptions': 'Subscription Plans',
    '/vendor/profile': 'My Profile',
    '/vendor/subscription': 'My Subscription',
    '/request-service/location': 'Request a Service',
    '/request-service': 'Request a Service',
    '/vendor/jobs': 'My Jobs',
    '/my-requests': (pathname) => {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 1 && parts[0] === 'my-requests') {
            return "Job Details";
        }
        return "My Service Requests";
    }
}


export function DashboardHeader() {
  const pathname = usePathname();
  const { user, profile } = useSupabaseProfile();
  const router = useRouter();
  const { toast } = useToast();
  const displayName = profile?.displayName || (user?.user_metadata?.full_name as string | undefined) || 'User';
  const photoURL = (user?.user_metadata?.avatar_url as string | undefined) || "https://github.com/shadcn.png";
  
  let title = "Jalaram Home Service";
  for (const path in pathToTitle) {
      if (pathname.startsWith(path)) {
          const titleOrFn = pathToTitle[path];
          if (typeof titleOrFn === 'function') {
              title = titleOrFn(pathname);
          } else {
              title = titleOrFn;
          }
          break;
      }
  }

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
  }


  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>

      <h1 className="text-lg font-semibold md:text-xl whitespace-nowrap">
        {title}
      </h1>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={photoURL} alt={displayName} />
                <AvatarFallback>{displayName.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || profile?.email || ''}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
