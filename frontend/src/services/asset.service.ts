import { AxiosResponse } from 'axios';
import { apiService } from './api.service';
import { API_ENDPOINTS } from '@config';
import { Stock, Crypto, ApiResponse } from '@types';

export const getStocks = (): Promise<AxiosResponse<ApiResponse<Stock[]>>> => {
  return apiService.get<Stock[]>(API_ENDPOINTS.STOCKS);
};

export const getCrypto = (): Promise<AxiosResponse<ApiResponse<Crypto[]>>> => {
  return apiService.get<Crypto[]>(API_ENDPOINTS.CRYPTO);
};
