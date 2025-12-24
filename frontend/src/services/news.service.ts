import { AxiosResponse } from 'axios';
import { apiService } from './api.service';
import { API_ENDPOINTS } from '@config';
import { News, ApiResponse } from '@types';

export const getNews = (): Promise<AxiosResponse<ApiResponse<News[]>>> => {
  return apiService.get<News[]>(API_ENDPOINTS.NEWS);
};
