import React from 'react';
import { TopPerformer } from '@types';
import { formatCurrency, formatPercent } from '@utils';

interface TopPerformersProps {
  topGainers: TopPerformer[];
  topLosers: TopPerformer[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ topGainers, topLosers }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Top Gainers</h2>
        <div className="space-y-3">
          {topGainers.slice(0, 3).map((asset) => (
            <div
              key={asset.symbol}
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-base">{asset.symbol}</div>
                <div className="text-sm text-gray-600">{asset.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {formatCurrency(asset.change)}
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {formatPercent(asset.changePercent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Top Losers</h2>
        <div className="space-y-3">
          {topLosers.slice(0, 3).map((asset) => (
            <div
              key={asset.symbol}
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-base">{asset.symbol}</div>
                <div className="text-sm text-gray-600">{asset.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">
                  {formatCurrency(asset.change)}
                </div>
                <div className="text-sm font-semibold text-red-600">
                  {formatPercent(asset.changePercent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
