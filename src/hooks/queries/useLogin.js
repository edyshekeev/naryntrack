"use client"
import axiosInstance from '@/libs/axios/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const useLogin = (router) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.access_token);
      router.push("/admin")
      window.location.reload();
    },
    onError: (error) => {
      console.error('Не удалось войти', error);
    },
  });
};
