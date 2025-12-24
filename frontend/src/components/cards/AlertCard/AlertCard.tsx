import React from 'react';
import { AlertCardProps } from './AlertCard.types';
import { formatDate } from '@utils';

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-1">
              <p className="text-gray-900 font-medium text-lg mb-1">{alert.message}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {alert.severity.replace(/_/g, ' ')}
                </span>
                {alert.assetId && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                    {alert.assetId}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-gray-500">{formatDate(alert.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
