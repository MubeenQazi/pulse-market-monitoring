// Common type definitions

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type Impact = 'low' | 'medium' | 'high' | 'critical';
export type ImpactType = 'positive' | 'negative' | 'neutral';
export type AssetType = 'stock' | 'crypto';
export type NewsCategory = 'all' | 'macro' | 'technology' | 'crypto' | 'earnings' | 'regulatory' | 'market';
export type AssetFilter = 'all' | 'stocks' | 'crypto';
export type ColorVariant = 'blue' | 'green' | 'red' | 'purple' | 'orange';

export interface SeverityConfig {
  bg: string;
  border: string;
  text: string;
  badge: string;
  icon: string;
  title: string;
}

export interface TabOption {
  value: string;
  label: string;
  count?: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChartBar {
  dataKey: string;
  fill: string;
  name: string;
}
