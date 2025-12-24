import React from 'react';
import { BadgeProps, BadgeVariant } from './Badge.types';

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
