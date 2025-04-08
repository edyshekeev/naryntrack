import axiosInstance from "@/libs/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getUserById = async ({ queryKey }) => {
    const [, userId] = queryKey;
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
};

export const useGetUserById = ({ userId, onSuccess, onError }) => {
    return useQuery({
        queryKey: ['getUserById', userId],
        queryFn: getUserById,
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: !!userId, // prevent running when userId is undefined/null
        onSuccess,
        onError,
    });
};