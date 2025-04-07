"use client"
import { useUserStore } from '@/store/useUserStore';
// src/hooks/useGetMe.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';

const fetchMe = async () => {
    const response = await axiosInstance.get('/me');
    return response.data;
};

export const useGetMe = () => {
    const setUser = useUserStore((state) => state.setUser);

    return useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        enabled: !!localStorage.getItem('authToken'), // Only fetch if token exists
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
        onSuccess: (data) => {
            setUser(data);
        },
        onError: (err) => {
            useUserStore.getState().clearUser();
            console.error('Failed to fetch user info:', err);
        },
    });
};