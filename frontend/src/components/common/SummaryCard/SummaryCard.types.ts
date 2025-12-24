import { ColorVariant } from '@types';

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: ColorVariant;
  className?: string;
}
