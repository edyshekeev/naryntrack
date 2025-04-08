import axiosInstance from '@/libs/axios/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await axiosInstance.get("/users/");
  return response.data;
};

export const useGetUsers = (enabled = true) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};


