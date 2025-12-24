import React from 'react';
import { TabFilterProps } from './TabFilter.types';

const TabFilter: React.FC<TabFilterProps> = ({ tabs, activeTab, onChange, showCount = true }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {tab.label}
            {showCount && tab.count !== undefined && (
              <span className="ml-2 text-xs opacity-75">({tab.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabFilter;
