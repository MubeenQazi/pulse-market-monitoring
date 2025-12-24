import { Severity, Impact, ImpactType, SeverityConfig, TabOption } from '@types';

// Color constants (Tailwind colors)
export const COLORS = {
  primary: 'rgb(59, 130, 246)', // blue-500
  success: 'rgb(16, 185, 129)', // green-500
  warning: 'rgb(245, 158, 11)', // amber-500
  danger: 'rgb(239, 68, 68)', // red-500
  purple: 'rgb(139, 92, 246)', // violet-500
  pink: 'rgb(236, 72, 153)', // pink-500
} as const;

export const CHART_COLORS: readonly string[] = [
  'rgb(59, 130, 246)',  // blue-500
  'rgb(16, 185, 129)',  // green-500
  'rgb(245, 158, 11)',  // amber-500
  'rgb(239, 68, 68)',   // red-500
  'rgb(139, 92, 246)',  // violet-500
  'rgb(236, 72, 153)',  // pink-500
] as const;

// Category colors
export const CATEGORY_COLORS: Record<string, string> = {
  macro: 'bg-purple-100 text-purple-800 border-purple-200',
  technology: 'bg-blue-100 text-blue-800 border-blue-200',
  crypto: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  earnings: 'bg-green-100 text-green-800 border-green-200',
  regulatory: 'bg-red-100 text-red-800 border-red-200',
  market: 'bg-gray-100 text-gray-800 border-gray-200',
};

// Severity configurations
export const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    badge: 'bg-red-100 text-red-800',
    icon: '',
    title: 'Critical Alerts',
  },
  high: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    badge: 'bg-orange-100 text-orange-800',
    icon: '',
    title: 'High Priority Alerts',
  },
  medium: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: '',
    title: 'Medium Priority Alerts',
  },
  low: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-800',
    icon: '',
    title: 'Low Priority Alerts',
  },
};

// Impact badges
export const IMPACT_BADGES: Record<Impact, string> = {
  low: 'bg-blue-50 text-blue-700 border border-blue-200',
  medium: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  high: 'bg-orange-50 text-orange-700 border border-orange-200',
  critical: 'bg-red-50 text-red-700 border border-red-200',
};

// News categories
export const NEWS_CATEGORIES: TabOption[] = [
  { value: 'all', label: 'All News' },
  { value: 'macro', label: 'Macro' },
  { value: 'technology', label: 'Technology' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'earnings', label: 'Earnings' },
  { value: 'regulatory', label: 'Regulatory' },
  { value: 'market', label: 'Market' },
];

// Severity order for alerts
export const SEVERITY_ORDER: readonly Severity[] = ['critical', 'high', 'medium', 'low'] as const;

// Impact colors
export const IMPACT_COLORS: Record<ImpactType, string> = {
  positive: 'text-green-600',
  negative: 'text-red-600',
  neutral: 'text-gray-600',
};
