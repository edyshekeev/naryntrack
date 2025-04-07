'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateUser } from '@/hooks/queries/createUser';

export default function CreateUserPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { mutate, isPending } = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || busNumber === '') {
      setError('Please fill in all fields.');
      return;
    }

    mutate(
      { username, password, busNumber },
      {
        onSuccess: () => router.push('/users'),
        onError: (err) => setError(err.message),
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create New User</h1>

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
            type="password"
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
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}