import { useState, useEffect } from 'react';
import { getAlerts } from '@services';
import { Alert } from '@types';

interface UseAlertsReturn {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAlerts = (): UseAlertsReturn => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAlerts();
      const alertsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Failed to load alerts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { alerts, loading, error, refetch: fetchData };
};
