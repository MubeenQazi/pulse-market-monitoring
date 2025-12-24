import { TabOption } from '@types';

export interface TabFilterProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (value: string) => void;
  showCount?: boolean;
}
