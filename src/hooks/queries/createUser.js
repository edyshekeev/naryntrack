// src/api/users/createUser.js
import { useMutation } from '@tanstack/react-query';

const createUserRequest = async ({ username, password, busNumber }) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      bus_number: parseInt(busNumber),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create user.');
  }

  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserRequest,
  });
};
