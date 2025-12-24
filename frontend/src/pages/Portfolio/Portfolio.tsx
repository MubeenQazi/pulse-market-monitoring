import React from 'react';
import { usePortfolio } from '@hooks';
import { LoadingSpinner, ErrorMessage, PageHeader, SummaryCard } from '@components/common';
import { PieChartWidget, BarChartWidget } from '@components/charts';
import { formatCurrency, formatPercent } from '@utils';
// import { CHART_COLORS } from '@config';

const Portfolio: React.FC = () => {
  const { portfolio, loading, error } = usePortfolio();

  if (loading) return <LoadingSpinner message="Loading portfolio..." />;
  if (error) return <ErrorMessage message={error} />;

  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  const pieChartData = portfolio.assets.map((asset) => ({
    name: asset.assetId,
    value: asset.value,
  }));

  const barChartData = portfolio.assets.map((asset) => ({
    name: asset.assetId,
    value: asset.value,
    change: asset.change,
    changePercent: asset.changePercent,
  }));

  const barChartBars = [
    { dataKey: 'value', fill: 'rgb(59, 130, 246)', name: 'Current Value' }, // blue-500
    { dataKey: 'change', fill: 'rgb(16, 185, 129)', name: 'Profit/Loss' }, // green-500
  ];

  const determineColor = (value: number) => (value >= 0 ? 'green' : 'red');

  return (
    <div>
      <PageHeader
        title="Portfolio"
        subtitle={`${portfolio.assets.length} ${portfolio.assets.length === 1 ? 'asset' : 'assets'}`}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Value" value={formatCurrency(portfolio.totalValue)} color="blue" />
        <SummaryCard
          title="Total Change"
          value={formatCurrency(portfolio.totalChange)}
          color={determineColor(portfolio.totalChange)}
        />
        <SummaryCard
          title="Return"
          value={formatPercent(portfolio.totalChangePercent)}
          color={determineColor(portfolio.totalChangePercent)}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartWidget data={pieChartData} title="Asset Allocation" />
        <BarChartWidget data={barChartData} title="Performance by Asset" bars={barChartBars} />
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P/L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.assets.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                    <div className="text-sm text-gray-500">{asset.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {asset.quantity.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {formatCurrency(asset.averagePrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {formatCurrency(asset.currentPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {formatCurrency(asset.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div
                      className={`${asset.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        } font-semibold`}
                    >
                      {formatPercent(asset.changePercent)}
                    </div>
                    <div className="text-xs text-gray-500">{formatCurrency(asset.change)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
