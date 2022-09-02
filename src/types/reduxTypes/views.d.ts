import { ModalName } from 'constants/modals';

export interface ViewsProps {
  redirection: RedirectionProps;
  menu: MenuProps;
  modal: IOpenedModal;
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

export interface IOpenedModal<P> {
  name: ModalName;
  props: P;
}
