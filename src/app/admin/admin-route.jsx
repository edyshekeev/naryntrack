'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useGetMe } from '@/hooks/queries/useGetMe';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();
  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    } else {
      if (!user.is_password_changed) {
        router.push("/admin/changepassword")
        return
      }
      if (user.is_admin)
        router.push("/admin/dashboard")
      else
        router.push("/admin/driver")
    }
  }, [user, router]);

  return children;
};

export default ProtectedRoute;