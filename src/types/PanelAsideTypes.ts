import { ReactNode, JSX } from "react";

interface NavItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

interface PanelAsideProps {
  children?: ReactNode;
  navItems: NavItem[];
  navItemsMonitoring?: NavItem[];
  mode?: string;
}

export type { NavItem };
export type { PanelAsideProps };
