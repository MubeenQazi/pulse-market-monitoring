import React from 'react';
import { useAssets } from '@hooks';
import { LoadingSpinner, ErrorMessage, PageHeader } from '@components/common';
import { AssetFilters, AssetStats, AssetTable } from './components';

const Assets: React.FC = () => {
  const { filteredAssets, loading, error, filter, setFilter, stocks, crypto } = useAssets();

  if (loading) return <LoadingSpinner message="Loading assets..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader title="Assets" />

      <AssetFilters
        filter={filter}
        setFilter={setFilter}
        stocksCount={stocks.length}
        cryptoCount={crypto.length}
      />

      <AssetStats assets={filteredAssets} />

      <AssetTable assets={filteredAssets} />
    </div>
  );
};

export default Assets;
