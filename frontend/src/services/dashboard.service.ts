import { AxiosResponse } from 'axios';
import { apiService } from './api.service';
import { API_ENDPOINTS } from '@config';
import { DashboardData, ApiResponse } from '@types';

export const getDashboard = (): Promise<AxiosResponse<ApiResponse<DashboardData>>> => {
  return apiService.get<DashboardData>(API_ENDPOINTS.DASHBOARD);
};
