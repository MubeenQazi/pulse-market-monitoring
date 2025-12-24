// Chart component prop types

import { ChartDataPoint, ChartBar } from './common.types';

export interface PieChartWidgetProps {
  data: ChartDataPoint[];
  title: string;
  className?: string;
}

export interface BarChartWidgetProps {
  data: ChartDataPoint[];
  title: string;
  bars: ChartBar[];
  className?: string;
}
