import React, { useState, useMemo } from 'react';
import { AssetWithType } from '@types';
import { formatCurrency, formatPercent, formatVolume } from '@utils';
import { Pagination } from '@components/common';

interface AssetTableProps {
  assets: AssetWithType[];
}

const AssetTable: React.FC<AssetTableProps> = ({ assets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // Filter assets based on search term
  const filteredAssets = useMemo(() => {
    if (!searchTerm.trim()) return assets;

    const search = searchTerm.toLowerCase();
    return assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(search) ||
        asset.name.toLowerCase().includes(search)
    );
  }, [assets, searchTerm]);

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by symbol or name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-500">
            Found {filteredAssets.length} {filteredAssets.length === 1 ? 'asset' : 'assets'}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAssets.length > 0 ? (
              currentAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                        <div className="text-sm text-gray-500">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${asset.type === 'stock'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                        }`}
                    >
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {formatCurrency(asset.price)}
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {formatVolume(asset.volume)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {formatVolume(asset.marketCap)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No assets found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredAssets.length}
        />
      )}
    </div>
  );
};

export default AssetTable;
