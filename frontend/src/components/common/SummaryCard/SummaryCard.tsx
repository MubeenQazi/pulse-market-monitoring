import React from 'react';
import { SummaryCardProps } from './SummaryCard.types';
import { ColorVariant } from '@types';

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'blue',
  className = '',
}) => {
  const colorVariants: Record<ColorVariant, string> = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    red: 'from-red-600 to-red-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
  };

  return (
    <div
      className={`bg-gradient-to-r ${colorVariants[color]} rounded-lg shadow-lg p-6 text-white ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-2 opacity-90">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-sm mt-1 opacity-90">{subtitle}</p>}
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
};

export default SummaryCard;
