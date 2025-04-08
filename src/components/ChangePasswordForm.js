'use client';

import { useForm } from 'react-hook-form';
import { useChangePassword } from '@/hooks/queries/useChangePassword';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm({ }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate: changePassword, isLoading, isSuccess, isError } = useChangePassword({
    onSuccess: () => {
      reset();
      router.push('/admin');
      window.location.reload();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || 'Failed to change password');
    },
  });

  const handleFormSubmit = (data) => {
    if (data.new_password == data.confirm_new_password) {
      delete data.confirm_new_password
      console.log(data)
      changePassword(data)
    }
    else {
      setErrorMessage("New passwords are not matched")
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Old password</label>
        <input
          {...register('old_password', { required: true })}
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none"
          placeholder="Enter old password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          {...register('new_password', { required: true })}
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none"
          placeholder="Enter new password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Confirm new password</label>
        <input
          {...register('confirm_new_password', { required: true })}
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none"
          placeholder="Enter new password"
        />
      </div>



      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition disabled:opacity-50"
      >
        {isLoading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
}