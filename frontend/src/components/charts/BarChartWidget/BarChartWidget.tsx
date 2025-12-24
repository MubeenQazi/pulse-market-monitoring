import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChartWidgetProps } from '@types';
import { formatCurrency, formatPercent } from '@utils';

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ data, title, bars, className = '' }) => {
  const defaultTooltipFormatter = (value: number, name: string): string => {
    if (name.toLowerCase().includes('percent')) return formatPercent(value);
    return formatCurrency(value);
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={defaultTooltipFormatter} />
          <Legend />
          {bars.map((bar) => (
            <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} name={bar.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartWidget;
