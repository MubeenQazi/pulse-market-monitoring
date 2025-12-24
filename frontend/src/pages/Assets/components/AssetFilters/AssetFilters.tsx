import React from 'react';
import { AssetFilter } from '@types';

interface AssetFiltersProps {
  filter: AssetFilter;
  setFilter: (filter: AssetFilter) => void;
  stocksCount: number;
  cryptoCount: number;
}

const AssetFilters: React.FC<AssetFiltersProps> = ({
  filter,
  setFilter,
  stocksCount,
  cryptoCount,
}) => {
  return (
    <div className="flex justify-end gap-2 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
      >
        All ({stocksCount + cryptoCount})
      </button>
      <button
        onClick={() => setFilter('stocks')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'stocks'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
      >
        Stocks ({stocksCount})
      </button>
      <button
        onClick={() => setFilter('crypto')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'crypto'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
      >
        Crypto ({cryptoCount})
      </button>
    </div>
  );
};

export default AssetFilters;
