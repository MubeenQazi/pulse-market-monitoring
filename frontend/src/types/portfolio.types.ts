// Portfolio-related type definitions

export interface PortfolioAsset {
  assetId: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

export interface Portfolio {
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  assets: PortfolioAsset[];
}
