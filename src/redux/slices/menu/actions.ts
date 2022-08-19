import { IAction, SliceReducers } from 'redux/store';
import { MenuProps } from 'types/reduxTypes/menu';

const actions: SliceReducers<MenuProps> = {
  setActiveItem(state, action: IAction<string[]>) {
    state.openItem = action.payload;
  },
  setOpenDrawer(state, action: IAction<boolean>) {
    state.drawerOpen = action.payload;
  }
};

export default actions;
