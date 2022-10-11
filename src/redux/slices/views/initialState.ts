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
  modals: [],
  toastNotificationPopUp: {
    open: false,
    props: {}
  }
});
