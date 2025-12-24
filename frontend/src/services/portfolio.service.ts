import { AxiosResponse } from 'axios';
import { apiService } from './api.service';
import { API_ENDPOINTS } from '@config';
import { Portfolio, ApiResponse } from '@types';

export const getPortfolio = (): Promise<AxiosResponse<ApiResponse<Portfolio>>> => {
  return apiService.get<Portfolio>(API_ENDPOINTS.PORTFOLIO);
};
