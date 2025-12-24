import React from 'react';
import { News } from '@types';
import { formatDate, getCategoryColor } from '@utils';

interface RecentNewsProps {
  news: News[];
}

const RecentNews: React.FC<RecentNewsProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent News</h2>
      </div>
      <div className="space-y-3">
        {news.slice(0, 5).map((item) => {
          // Use publishedAt or timestamp field, whichever is available
          const dateField = item.publishedAt || (item as any).timestamp;

          return (
            <div
              key={item.id}
              className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-gray-900 flex-1">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-gray-500">{item.source}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{formatDate(dateField)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentNews;
