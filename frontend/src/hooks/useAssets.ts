import { useState, useEffect } from 'react';
import { getStocks, getCrypto } from '@services';
import { Stock, Crypto, AssetWithType, AssetFilter } from '@types';

interface UseAssetsReturn {
  stocks: Stock[];
  crypto: Crypto[];
  filteredAssets: AssetWithType[];
  loading: boolean;
  error: string | null;
  filter: AssetFilter;
  setFilter: (filter: AssetFilter) => void;
  refetch: () => Promise<void>;
}

export const useAssets = (): UseAssetsReturn => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [filter, setFilter] = useState<AssetFilter>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stocksResponse, cryptoResponse] = await Promise.all([
        getStocks(),
        getCrypto(),
      ]);

      const stocksData = Array.isArray(stocksResponse.data)
        ? stocksResponse.data
        : stocksResponse.data?.data || [];
      const cryptoData = Array.isArray(cryptoResponse.data)
        ? cryptoResponse.data
        : cryptoResponse.data?.data || [];

      // Map currentPrice to price and changeAmount to change for consistency
      setStocks(stocksData.map((s: any) => ({
        ...s,
        price: s.price || s.currentPrice,
        change: s.change || s.changeAmount || 0,
        changePercent: s.changePercent || 0,
        type: 'stock' as const
      })));
      setCrypto(cryptoData.map((c: any) => ({
        ...c,
        price: c.price || c.currentPrice,
        change: c.change || c.changeAmount || 0,
        changePercent: c.changePercent || 0,
        type: 'crypto' as const
      })));
      setError(null);
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError('Failed to load assets data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredAssets = (): AssetWithType[] => {
    if (filter === 'stocks') return stocks;
    if (filter === 'crypto') return crypto;
    return [...stocks, ...crypto];
  };

  const filteredAssets = getFilteredAssets();

  return {
    stocks,
    crypto,
    filteredAssets,
    loading,
    error,
    filter,
    setFilter,
    refetch: fetchData,
  };
};
