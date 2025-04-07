'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGetMe } from '@/hooks/queries/useGetMe';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Auth check
  const { data: currentUser, isLoading: authLoading, isError: authError } = useGetMe();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!authLoading && authError) {
  //     router.push('/login');
  //   }
  // }, [authLoading, authError, router]);

  // Fetch user to edit
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();

        setUser(data);
        setUsername(data.username ?? '');
        setPassword(data.password ?? '');
        setBusNumber(data.bus_number?.toString() ?? '');
      } catch (err) {
        setError('Failed to load user.');
      }
    };

    if (!authLoading && !authError) {
      fetchUser();
    }
  }, [id, authLoading, authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || busNumber === '') {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          bus_number: parseInt(busNumber),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update user.');
        return;
      }

      router.push('/users');
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  if (authLoading || !user) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Edit User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bus Number</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/users')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
