export interface IBreadcrumbNavigationItem {
  name: string;
  path: string;
}

export interface IMainBreadcrumb {
  currentPage: string;
  navigation: {
    basePath: string;
    items: INavigationItem[];
  };
}

export interface IBreadcrumbNavItemProp {
  page: INavigationItem;
  index: number;
}
