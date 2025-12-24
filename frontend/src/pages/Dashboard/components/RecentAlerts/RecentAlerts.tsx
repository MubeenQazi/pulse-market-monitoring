import React, { useState } from 'react';
import { Alert } from '@types';
import { formatDate, getSeverityConfig } from '@utils';

interface RecentAlertsProps {
  alerts: Alert[];
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAlert = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
      </div>
      <div className="space-y-3">
        {alerts.slice(0, 5).map((alert) => {
          const config = getSeverityConfig(alert.severity);
          const isExpanded = expandedId === alert.id;

          return (
            <div
              key={alert.id}
              className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              onClick={() => toggleAlert(alert.id)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-gray-900 flex-1">
                  {alert.message}
                </p>
                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${config.badge}`}>
                  {alert.severity}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(alert.timestamp)}
              </div>
              {isExpanded && alert.assetId && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Related Asset:</span>
                    <span className="text-xs font-medium text-blue-600">{alert.assetId}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAlerts;
