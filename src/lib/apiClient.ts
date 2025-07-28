const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  },

  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string): Promise<void> {
    return this.request<void>(endpoint, {
      method: 'DELETE',
    });
  },
};

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId?: number;
}

export interface UpdatePostData {
  title: string;
  body: string;
}

export const postsApi = {
  getAll: async (): Promise<Post[]> => {
    return await apiClient.get<Post[]>('/posts');
  },

  getById: async (id: number): Promise<Post> => {
    return await apiClient.get<Post>(`/posts/${id}`);
  },

  create: async (data: CreatePostData): Promise<Post> => {
    return await apiClient.post<Post>('/posts', data);
  },

  update: async (id: number, data: UpdatePostData): Promise<Post> => {
    return await apiClient.put<Post>(`/posts/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};

export const commentsApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    return await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
  },
};

export default apiClient; 