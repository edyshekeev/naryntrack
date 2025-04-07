'use client';

import { useRouter } from 'next/navigation';
import { useGetMe } from '@/hooks/queries/useGetMe';
import { useGetUsers } from '@/hooks/queries/useGetUsers';

export default function AdminPage() {
  const router = useRouter();
  const { data: currentUser, isLoading: loadingUser, isError: authError } = useGetMe();
  const {
    data: users = [],
    isLoading: loadingUsers,
    isError: userFetchError,
    refetch,
  } = useGetUsers(!!currentUser); // Only fetch if authenticated

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await refetch();
      } else {
        alert('Error deleting user');
      }
    } catch (error) {
      alert('Error deleting user');
    }
  };

  const handleEdit = (id) => {
    router.push(`/users/${id}`);
  };

  if (loadingUser || loadingUsers) return <p>Loading...</p>;
  if (authError || userFetchError) return <p className="text-red-500">Unauthorized or failed to fetch users</p>;

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - User Management</h1>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Bus Number</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.bus_number}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}