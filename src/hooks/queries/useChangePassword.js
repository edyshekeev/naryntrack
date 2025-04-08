import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios/axiosInstance';

const changePassword = async (data) => {
  const response = await axiosInstance.post('/change_password',
    data,
  );
  return response.data;
};

export const useChangePassword = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
    onError,
  });
};