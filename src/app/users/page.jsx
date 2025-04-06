'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'DELETE',
        });
        const deletedUser = await response.json();
        if (deletedUser.id) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">User Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push('/users/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading users...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Username</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Bus Number</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4 text-sm text-gray-700">{user.username}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{user.bus_number}</td>
                <td className="py-2 px-4 text-sm">
                  <button
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}