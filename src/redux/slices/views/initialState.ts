import { ViewsProps } from 'types/reduxTypes/viewsStateTypes';

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
