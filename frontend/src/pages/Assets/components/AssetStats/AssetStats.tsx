import React from 'react';
import { AssetWithType } from '@types';

interface AssetStatsProps {
  assets: AssetWithType[];
}

const AssetStats: React.FC<AssetStatsProps> = ({ assets }) => {
  const gainers = assets.filter((a) => a.changePercent > 0).length;
  const losers = assets.filter((a) => a.changePercent < 0).length;
  // const avgChange =
  //   assets.length > 0
  //     ? assets.reduce((sum, a) => sum + a.changePercent, 0) / assets.length
  //     : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Total Assets</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{assets.length}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Gainers</div>
        <div className="text-2xl font-bold text-green-600 mt-1">{gainers}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">Losers</div>
        <div className="text-2xl font-bold text-red-600 mt-1">{losers}</div>
      </div>
    </div>
  );
};

export default AssetStats;
