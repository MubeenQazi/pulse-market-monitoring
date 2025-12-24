import { CATEGORY_COLORS, SEVERITY_CONFIG, IMPACT_BADGES, IMPACT_COLORS } from '@config';
import { SeverityConfig, Severity, Impact, ImpactType } from '@types';

/**
 * Get CSS classes for category badge
 */
export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Get severity configuration
 */
export const getSeverityConfig = (severity: Severity): SeverityConfig => {
  return SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.low;
};

/**
 * Get CSS classes for impact badge
 */
export const getImpactBadge = (impact: Impact): string => {
  return IMPACT_BADGES[impact] || 'bg-gray-50 text-gray-700 border border-gray-200';
};

/**
 * Get CSS color class for impact
 */
export const getImpactColor = (impact: ImpactType): string => {
  return IMPACT_COLORS[impact] || 'text-gray-600';
};

/**
 * Get CSS color class for sentiment score
 */
export const getSentimentColor = (sentiment: number): string => {
  if (sentiment >= 0.7) return 'text-green-600';
  if (sentiment >= 0.4) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Group items by a specific property
 */
export const groupBy = <T>(
  items: T[],
  property: keyof T
): Record<string, T[]> => {
  return items.reduce((acc, item) => {
    const key = String(item[property]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};
