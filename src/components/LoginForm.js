'use client';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/queries/useLogin';
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const { mutate, isLoading, isError } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);

      if (data.is_password_changed === false) {
        router.push('/admin/changepassword');
      } else {
        router.push('/admin');
      }
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="m-1 text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form
          className="flex flex-col justify-center items-center space-y-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-30 bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          {isError && (
            <p className="text-red-600 text-sm mt-2">Login failed. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}