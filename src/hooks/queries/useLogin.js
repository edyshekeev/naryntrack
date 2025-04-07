"use client"
import axiosInstance from '@/libs/axios/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
};
