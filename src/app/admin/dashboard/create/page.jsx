'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCreateUser } from '@/hooks/queries/createUser';
import { useState } from 'react';

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      router.push('/admin/dashboard')
      window.location.reload();
    },
    onError: (err) => setError(err.message || 'Что-то пошло не так'),
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = (data) => {
    setError('');
    data.is_admin = false
    mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Создать нового пользователя</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Имя пользователя</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            {...register('username', { required: 'Введите имя пользователя' })}
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Пароль</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            {...register('password', { required: 'Введите пароль' })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Номер автобуса</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            {...register('car_number', { required: 'Введите номер автобуса' })}
          />
          {errors.car_number && (
            <p className="text-red-600 text-sm mt-1">{errors.car_number.message}</p>
          )}
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
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? 'Создаем...' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  );
}
