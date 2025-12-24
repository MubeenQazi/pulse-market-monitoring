import { useState, useEffect } from 'react';
import { getPortfolio } from '@services';
import { Portfolio } from '@types';

interface UsePortfolioReturn {
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePortfolio = (): UsePortfolioReturn => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPortfolio();
      const portfolioData = response.data?.data || response.data;

      // Enrich assets with symbol, name, and fix field mappings
      if (portfolioData?.assets) {
        portfolioData.assets = portfolioData.assets.map((asset: any) => ({
          ...asset,
          symbol: asset.symbol || asset.assetId,
          name: asset.name || asset.assetId,
          averagePrice: asset.averagePrice || asset.avgBuyPrice || 0,
        }));
      }

      setPortfolio(portfolioData);
      setError(null);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError('Failed to load portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { portfolio, loading, error, refetch: fetchData };
};
