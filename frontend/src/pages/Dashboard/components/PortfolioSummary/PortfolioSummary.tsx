import React from 'react';
import { Portfolio } from '@types';
import { formatCurrency, formatPercent } from '@utils';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ portfolio }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 mb-6 text-white">
      <h2 className="text-lg font-semibold mb-4 opacity-90">Portfolio Summary</h2>
      <div className="flex items-baseline gap-4">
        <div className="text-4xl font-bold">{formatCurrency(portfolio.totalValue)}</div>
        <div
          className={`text-xl font-semibold ${portfolio.totalChangePercent >= 0 ? 'text-green-300' : 'text-red-300'
            }`}
        >
          {formatCurrency(portfolio.totalChange)} ({formatPercent(portfolio.totalChangePercent)})
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
