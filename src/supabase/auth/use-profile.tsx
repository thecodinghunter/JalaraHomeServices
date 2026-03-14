'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/supabase/client';
import { useSupabaseUser } from '@/supabase/auth/use-user';
import type { UserProfile } from '@/lib/types';

export function useSupabaseProfile() {
  const { user, loading: userLoading } = useSupabaseUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (userLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let active = true;

    supabase
      .from('profiles')
      .select('uid,email,display_name,phone_number,role')
      .eq('uid', user.id)
      .single()
      .then(({ data }) => {
        if (!active) return;

        if (!data) {
          setProfile({
            uid: user.id,
            email: user.email ?? null,
            displayName: (user.user_metadata?.full_name as string | undefined) ?? null,
            phoneNumber: (user.user_metadata?.phone as string | undefined) ?? null,
            role: 'customer',
          });
          setLoading(false);
          return;
        }

        setProfile({
          uid: data.uid,
          email: data.email,
          displayName: data.display_name,
          phoneNumber: data.phone_number,
          role: data.role,
        });
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user, userLoading]);

  return { profile, loading: userLoading || loading, user };
}
