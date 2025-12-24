// Alert-related type definitions

import { Severity } from './common.types';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  assetId: string;
  timestamp: string;
  acknowledged?: boolean;
  metadata?: Record<string, unknown>;
}

export interface GroupedAlerts {
  [key: string]: Alert[];
}
