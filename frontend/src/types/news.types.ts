// News-related type definitions

import { NewsCategory, ImpactType } from './common.types';

export interface News {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: string;
  publishedAt: string;
  url?: string;
  imageUrl?: string;
  sentiment?: number;
  impact?: ImpactType;
  relatedAssets?: string[];
}
