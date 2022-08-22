import { IAction, SliceReducers } from 'redux/store';
import { RedirectionProps, ViewsProps } from 'types/reduxTypes/views';

const actions: SliceReducers<ViewsProps> = {
  setRedirection(state, action: IAction<RedirectionProps>) {
    state.redirection = action.payload;
  },
  setMenuActiveItem(state, action: IAction<string[]>) {
    state.menu.openItem = action.payload;
  },
  setMenuOpenDrawer(state, action: IAction<boolean>) {
    state.menu.drawerOpen = action.payload;
  }
};

export default actions;
