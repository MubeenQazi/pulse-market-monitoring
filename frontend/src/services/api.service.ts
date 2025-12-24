import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '@config';
import { ApiResponse, ApiError } from '@types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // You can add auth tokens here if needed
        // config.headers.Authorization = `Bearer ${token}`
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiError>) => {
        // Handle errors globally
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.get<ApiResponse<T>>(url);
  }

  async post<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.post<ApiResponse<T>>(url, data);
  }

  async put<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.put<ApiResponse<T>>(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.delete<ApiResponse<T>>(url);
  }

  async patch<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.patch<ApiResponse<T>>(url, data);
  }
}

export const apiService = new ApiService();
