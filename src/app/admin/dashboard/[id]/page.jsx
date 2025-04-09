'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetMe } from '@/hooks/queries/useGetMe';
import { useForm } from 'react-hook-form';
import { useGetUserById } from '@/hooks/queries/useGetUserById';
import { useUpdateUser } from '@/hooks/queries/usePatchUser';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading } = useGetUserById({ userId: params.id })
  const { mutate: updateUser } = useUpdateUser({
    onSuccess: () => {
      router.push('/admin/dashboard')
      window.location.reload();
    },
    onError: (error) => {
      console.error("Ошибка при редактировании пользователя:", error);
    }
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => { reset(data) }, [data])

  const onSubmit = async (data) => {
    updateUser({ userId: params.id, data })
  };

  if (isLoading) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Редактировать пользователя</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Имя пользователя</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="text-red-500 text-sm">Введите имя пользователя</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Номер автобуса</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            {...register('car_number', { required: true })}
          />
          {errors.car_number && <p className="text-red-500 text-sm">Введите номер автобуса</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
          >
            Отмена
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Редактировать
          </button>
        </div>
      </form>
    </div>
  );
}
