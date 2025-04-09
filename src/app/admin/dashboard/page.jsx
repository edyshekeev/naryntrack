'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/hooks/queries/useGetMe';
import { useGetUsers } from '@/hooks/queries/useGetUsers';
import { useDeleteUser } from '@/hooks/queries/useDeleteUser';

export default function AdminPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    data: currentUser,
    isLoading: loadingUser,
    isError: authError,
  } = useGetMe();

  const {
    data: users = [],
    isLoading: loadingUsers,
    isError: userFetchError,
    refetch,
  } = useGetUsers();

  const {
    mutate: deleteUser,
    isLoading: loadingDeleted
  } = useDeleteUser();

  const handleEdit = (id) => {
    router.push(`dashboard/${id}`);
  };

  const handleAddUser = () => {
    router.push('dashboard/create');
  };

  const handleDelete = (id) => {
    deleteUser(id, {
      onSuccess: () => refetch()
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin');
    window.location.reload();
  };

  if (!isHydrated || loadingUser || loadingUsers || loadingDeleted)
    return <p>Загрузка...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Панель администратора</h1>
        <div className="flex gap-4">
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            + Создать нового пользователя
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Имя пользователя</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Номер автобуса</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user?.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800">{user?.username}</td>
                <td className="px-6 py-4 text-gray-800">{user?.car_number}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(user?.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(user?.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
