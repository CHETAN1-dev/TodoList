import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

const BASE_URL = 'http://10.0.2.2:3000';

export const fetchTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const useTasks = () => {
  return useQuery({queryKey: ['tasks'], queryFn: fetchTasks});
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async task => {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({id, ...updates}) => {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async id => {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });
};
