import { ModalName } from 'constants/modals';
import { ViewsProps } from 'types/reduxTypes/views';

export const getInitialState = (): ViewsProps => ({
  redirection: {
    path: '/',
    params: '',
    apply: false
  },
  menu: {
    openItem: ['dashboard'],
    drawerOpen: false
  },
  modal: {
    name: ModalName.NONE,
    props: {}
  }
});
