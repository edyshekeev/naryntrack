import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const useGetUsers = (enabled = true) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
    retry: false,
  });
};
