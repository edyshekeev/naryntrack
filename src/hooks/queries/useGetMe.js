"use client";
import { useUserStore } from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios/axiosInstance';

const fetchMe = async () => {
  const response = await axiosInstance.get('/me');
  return response.data;
};

export const useGetMe = () => {
  const setUser = useUserStore((state) => state.setUser);

  const isClient = typeof window !== 'undefined';
  const tokenExists = isClient && localStorage.getItem('authToken');

  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    enabled: !!tokenExists, // ✅ Safe check for client
    staleTime: 1000 * 60 * 5,
    retry: false,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err) => {
      useUserStore.getState().clearUser();
      console.error('Не удалось получить информацию о пользователе', err);
    },
  });
};
