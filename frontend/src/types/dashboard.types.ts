// Dashboard-related type definitions

import { Portfolio } from './portfolio.types';
import { Alert } from './alert.types';
import { News } from './news.types';

export interface AssetAllocation {
  asset: string;
  value: number;
  percentage: number;
}

export interface TopPerformer {
  symbol: string;
  name: string;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

export interface DashboardData {
  portfolio: Portfolio;
  assetAllocation: AssetAllocation[];
  topPerformers: TopPerformer[];
  recentAlerts: Alert[];
  recentNews?: News[];
}
