import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChartWidgetProps } from '@types';
import { CHART_COLORS } from '@config';
import { formatCurrency } from '@utils';

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-900">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: { name: string; percent: number }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="rgb(59, 130, 246)" // blue-500
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartWidget;
