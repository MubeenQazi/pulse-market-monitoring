import { AxiosResponse } from 'axios';
import { apiService } from './api.service';
import { API_ENDPOINTS } from '@config';
import { Alert, ApiResponse } from '@types';

export const getAlerts = (): Promise<AxiosResponse<ApiResponse<Alert[]>>> => {
  return apiService.get<Alert[]>(API_ENDPOINTS.ALERTS);
};
