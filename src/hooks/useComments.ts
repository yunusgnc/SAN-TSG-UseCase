import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '../lib/apiClient';

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.getByPostId(postId),
    enabled: !!postId,
  });
};

export const useAllComments = () => {
  return useQuery({
    queryKey: ['all-comments'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });
}; 