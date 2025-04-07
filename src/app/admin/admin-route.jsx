'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useGetMe } from '@/hooks/queries/useGetMe';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();
  console.log(user)
  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }else{
      router.push("/admin/dashboard")
    }
  }, [user, router]);

  return children;
};

export default ProtectedRoute;