import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios/axiosInstance';

const changePassword = async ({ newPassword }) => {
  const response = await axiosInstance.post('/changepassword', {
    new_password: newPassword,
  });
  return response.data;
};

export const useChangePassword = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
    onError,
  });
};