import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}
