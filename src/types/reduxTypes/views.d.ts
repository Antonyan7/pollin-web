export interface ViewsProps {
  redirection: RedirectionProps;
  menu: MenuProps;
}

export interface RedirectionProps {
  path: string;
  params?: string;
  apply: boolean;
}

export interface MenuProps {
  openItem: string[];
  drawerOpen: boolean;
}
