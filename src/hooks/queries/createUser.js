// src/api/users/createUser.js
import axiosInstance from '@/libs/axios/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const createUserRequest = async (data) => {
  const res = await axiosInstance.post("/users/", data)

  return res.data;
};

export const useCreateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createUserRequest,
    onSuccess,
    onError
  });
};
