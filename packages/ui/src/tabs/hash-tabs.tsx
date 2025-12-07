'use client';

import { AdminTabs, AdminTabPanel, type AdminTab } from '../admin/admin-tabs';

export type HashTab = AdminTab;

export interface HashTabsProps {
  tabs: HashTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function HashTabs(props: HashTabsProps) {
  return <AdminTabs {...props} />;
}

export interface HashTabPanelProps {
  children: React.ReactNode;
  tabId: string;
  activeTab?: string;
  className?: string;
}

export function HashTabPanel(props: HashTabPanelProps) {
  return <AdminTabPanel {...props} />;
}
