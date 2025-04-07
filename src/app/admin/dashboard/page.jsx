'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if the user is logged in
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken'); // Assuming auth token is saved here
  //   if (!token) {
  //     router.push('/login');
  //   } else {
  //     fetchUsers();
  //   }
  // }, [router]);

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
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

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
