// Asset-related type definitions

import { AssetType } from './common.types';

export interface BaseAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: string;
}

export interface Stock extends BaseAsset {
  type: 'stock';
  sector?: string;
  industry?: string;
}

export interface Crypto extends BaseAsset {
  type: 'crypto';
  circulatingSupply?: number;
  maxSupply?: number;
}

export type Asset = Stock | Crypto;

export interface AssetWithType extends BaseAsset {
  type: AssetType;
}
