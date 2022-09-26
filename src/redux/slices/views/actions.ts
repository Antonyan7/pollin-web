import { ModalName } from 'constants/modals';
import { IAction, SliceReducers } from 'redux/store';
import { IOpenedModal, RedirectionProps, ViewsProps } from 'types/reduxTypes/views';

import { IOpenedAlert } from '../../../types/reduxTypes/views.d';

const actions: SliceReducers<ViewsProps> = {
  setRedirection(state, action: IAction<RedirectionProps>) {
    state.redirection = action.payload;
  },
  setMenuActiveItem(state, action: IAction<string[]>) {
    state.menu.openItem = action.payload;
  },
  setMenuOpenDrawer(state, action: IAction<boolean>) {
    state.menu.drawerOpen = action.payload;
  },
  updateModalState<P>(state: ViewsProps, action: IAction<IOpenedModal<P>>) {
    state.modal = action.payload ? action.payload : { name: ModalName.NONE, props: {} };
  },
  updateAlertState<P>(state: ViewsProps, action: IAction<IOpenedAlert<P>>) {
    state.toastNotificationPopUp = action.payload ? action.payload : { open: false, props: {} };
  }
};

export default actions;
