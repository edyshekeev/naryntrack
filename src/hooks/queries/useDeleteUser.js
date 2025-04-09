import axiosInstance from '@/libs/axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
        onError: () => {
            alert('Ошибка при удалении пользователя');
        },
    });
};