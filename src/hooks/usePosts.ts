import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi, type Post, type CreatePostData, type UpdatePostData } from '../lib/apiClient';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => postsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.update(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}; 