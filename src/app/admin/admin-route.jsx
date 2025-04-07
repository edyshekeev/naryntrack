'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Optionally render a loading spinner or nothing until redirect is resolved
  if (!user) return null;

  return children;
};

export default ProtectedRoute;