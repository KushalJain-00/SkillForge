import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api';
const FRONTEND_ONLY_MODE = import.meta.env.VITE_FRONTEND_ONLY_MODE === 'true';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      // Handle network errors gracefully
      console.warn('Network error - backend may be unavailable:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Auth API
export const authAPI = {
  register: (data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => api.post<ApiResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse>('/auth/login', data),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse>('/auth/refresh', { refreshToken }),

  logout: () => api.post<ApiResponse>('/auth/logout'),

  getMe: () => api.get<ApiResponse>('/auth/me'),

  forgotPassword: (email: string) =>
    api.post<ApiResponse>('/auth/forgot-password', { email }),

  resetPassword: (data: { token: string; password: string }) =>
    api.post<ApiResponse>('/auth/reset-password', data),
};

// Users API
export const usersAPI = {
  getProfile: (username: string) =>
    api.get<ApiResponse>(`/users/profile/${username}`),

  updateProfile: (data: any) =>
    api.put<ApiResponse>('/users/profile', data),

  getDashboard: () => api.get<ApiResponse>('/users/dashboard'),

  getPortfolio: (username: string) =>
    api.get<ApiResponse>(`/users/portfolio/${username}`),

  getUserProjects: (username: string, params?: any) =>
    api.get<ApiResponse>(`/users/${username}/projects`, { params }),

  getUserBadges: (username: string) =>
    api.get<ApiResponse>(`/users/${username}/badges`),

  searchUsers: (params: { q: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/users/search', { params }),
};

// Learning API
export const learningAPI = {
  getTracks: (params?: any) =>
    api.get<ApiResponse>('/learning/tracks', { params }),

  getTrack: (id: string) =>
    api.get<ApiResponse>(`/learning/tracks/${id}`),

  enrollInTrack: (id: string) =>
    api.post<ApiResponse>(`/learning/tracks/${id}/enroll`),

  getEnrollments: (params?: any) =>
    api.get<ApiResponse>('/learning/enrollments', { params }),

  updateEnrollmentProgress: (enrollmentId: string, progress: number) =>
    api.patch<ApiResponse>(`/learning/enrollments/${enrollmentId}/progress`, {
      progress,
    }),

  getModule: (id: string) =>
    api.get<ApiResponse>(`/learning/modules/${id}`),

  updateModuleProgress: (id: string, progress: number) =>
    api.patch<ApiResponse>(`/learning/modules/${id}/progress`, { progress }),

  searchTracks: (params: { q: string; level?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/learning/search', { params }),
};

// Projects API
export const projectsAPI = {
  getProjects: (params?: any) =>
    api.get<ApiResponse>('/projects', { params }),

  getProject: (id: string) =>
    api.get<ApiResponse>(`/projects/${id}`),

  createProject: (data: any) =>
    api.post<ApiResponse>('/projects', data),

  updateProject: (id: string, data: any) =>
    api.put<ApiResponse>(`/projects/${id}`, data),

  deleteProject: (id: string) =>
    api.delete<ApiResponse>(`/projects/${id}`),

  likeProject: (id: string) =>
    api.post<ApiResponse>(`/projects/${id}/like`),

  getProjectComments: (id: string, params?: any) =>
    api.get<ApiResponse>(`/projects/${id}/comments`, { params }),

  addProjectComment: (id: string, content: string) =>
    api.post<ApiResponse>(`/projects/${id}/comments`, { content }),

  searchProjects: (params: { q: string; difficulty?: string; technology?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/projects/search', { params }),

  getFeaturedProjects: (limit?: number) =>
    api.get<ApiResponse>('/projects/featured', { params: { limit } }),
};

// Community API
export const communityAPI = {
  getPosts: (params?: any) =>
    api.get<ApiResponse>('/community/posts', { params }),

  getPost: (id: string) =>
    api.get<ApiResponse>(`/community/posts/${id}`),

  createPost: (data: any) =>
    api.post<ApiResponse>('/community/posts', data),

  updatePost: (id: string, data: any) =>
    api.put<ApiResponse>(`/community/posts/${id}`, data),

  deletePost: (id: string) =>
    api.delete<ApiResponse>(`/community/posts/${id}`),

  markPostSolved: (id: string) =>
    api.patch<ApiResponse>(`/community/posts/${id}/solve`),

  addReply: (postId: string, data: { content: string; parentId?: string }) =>
    api.post<ApiResponse>(`/community/posts/${postId}/replies`, data),

  updateReply: (id: string, content: string) =>
    api.put<ApiResponse>(`/community/replies/${id}`, { content }),

  deleteReply: (id: string) =>
    api.delete<ApiResponse>(`/community/replies/${id}`),

  getCategories: () =>
    api.get<ApiResponse>('/community/categories'),

  searchPosts: (params: { q: string; category?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse>('/community/search', { params }),

  getTrendingPosts: (limit?: number) =>
    api.get<ApiResponse>('/community/trending', { params: { limit } }),
};

// Upload API
export const uploadAPI = {
  uploadSingle: (file: File, type: string = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post<ApiResponse>('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadMultiple: (files: File[], type: string = 'general') => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('type', type);
    return api.post<ApiResponse>('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteFile: (publicId: string) =>
    api.delete<ApiResponse>(`/upload/${publicId}`),

  getUploadStats: () =>
    api.get<ApiResponse>('/upload/stats'),
};

// Admin API
export const adminAPI = {
  getDashboard: () =>
    api.get<ApiResponse>('/admin/dashboard'),

  getUsers: (params?: any) =>
    api.get<ApiResponse>('/admin/users', { params }),

  updateUserRole: (id: string, role: string) =>
    api.patch<ApiResponse>(`/admin/users/${id}/role`, { role }),

  toggleUserStatus: (id: string, isActive: boolean) =>
    api.patch<ApiResponse>(`/admin/users/${id}/status`, { isActive }),

  getCourses: (params?: any) =>
    api.get<ApiResponse>('/admin/courses', { params }),

  toggleCoursePublish: (id: string, isPublished: boolean) =>
    api.patch<ApiResponse>(`/admin/courses/${id}/publish`, { isPublished }),

  getProjects: (params?: any) =>
    api.get<ApiResponse>('/admin/projects', { params }),

  toggleProjectFeatured: (id: string, isFeatured: boolean) =>
    api.patch<ApiResponse>(`/admin/projects/${id}/feature`, { isFeatured }),

  getPosts: (params?: any) =>
    api.get<ApiResponse>('/admin/posts', { params }),

  togglePostPinned: (id: string, isPinned: boolean) =>
    api.patch<ApiResponse>(`/admin/posts/${id}/pin`, { isPinned }),

  getAnalytics: (period?: string) =>
    api.get<ApiResponse>('/admin/analytics', { params: { period } }),

  getLogs: (params?: any) =>
    api.get<ApiResponse>('/admin/logs', { params }),
};

export default api;
