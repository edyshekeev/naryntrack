import axiosInstance from "@/libs/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const updateUser = async ({ userId, data }) => {
    const response = await axiosInstance.put(`/users/${userId}`, data);
    return response.data;
};


export const useUpdateUser = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: updateUser,
        onSuccess,
        onError,
    });
};