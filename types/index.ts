export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface WalletItem {
  id: string;
  name: string;
  icon: string;
  balance: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  icon: string;
  badge?: "HOT" | "NEW" | string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  isCenter?: boolean;
  badge?: boolean;
}
