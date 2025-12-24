import React from 'react';
import { NewsCardProps } from './NewsCard.types';
import { formatDate, getCategoryColor, getImpactBadge, getSentimentColor } from '@utils';

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-xl font-bold text-gray-900 flex-1">{news.title}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(
            news.category
          )}`}
        >
          {news.category}
        </span>
      </div>

      <p className="text-gray-700 mb-4">{news.summary}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Source:</span>
          <span className="font-medium text-gray-900">{news.source}</span>
        </div>
        {news.impact && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Impact:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactBadge('low')}`}>
              {news.impact}
            </span>
          </div>
        )}
        {news.sentiment !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Sentiment:</span>
            <span className={`font-semibold ${getSentimentColor(news.sentiment)}`}>
              {(news.sentiment * 100).toFixed(0)}%
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatDate(news.publishedAt, false)}
        </div>
      </div>

      {news.relatedAssets && news.relatedAssets.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">Affected Assets:</span>
            {news.relatedAssets.map((asset, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
              >
                {asset}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
