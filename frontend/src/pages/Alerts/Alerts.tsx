import React from 'react';
import { useAlerts } from '@hooks';
import { LoadingSpinner, ErrorMessage, PageHeader } from '@components/common';
import { AlertCard } from '@components/cards';
import { SEVERITY_ORDER } from '@config';
import { groupBy, getSeverityConfig } from '@utils';

const Alerts: React.FC = () => {
  const { alerts, loading, error } = useAlerts();

  if (loading) return <LoadingSpinner message="Loading alerts..." />;
  if (error) return <ErrorMessage message={error} />;

  const groupedAlerts = groupBy(alerts, 'severity');

  return (
    <div>
      <PageHeader
        title="Active Alerts"
        subtitle={`${alerts.length} total ${alerts.length === 1 ? 'alert' : 'alerts'}`}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {SEVERITY_ORDER.map((severity) => {
          const config = getSeverityConfig(severity);
          const count = (groupedAlerts[severity] || []).length;
          return (
            <div key={severity} className={`${config.bg} border ${config.border} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 capitalize">{severity}</p>
                  <p className={`text-2xl font-bold ${config.text}`}>{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts Grouped by Severity */}
      <div className="space-y-6">
        {SEVERITY_ORDER.map((severity) => {
          const severityAlerts = groupedAlerts[severity] || [];
          if (severityAlerts.length === 0) return null;

          const config = getSeverityConfig(severity);

          return (
            <div key={severity} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${config.bg} border-b ${config.border} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold ${config.text} flex items-center gap-2`}>
                    {config.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.badge}`}>
                    {severityAlerts.length} {severityAlerts.length === 1 ? 'alert' : 'alerts'}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {severityAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
