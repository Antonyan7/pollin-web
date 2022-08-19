import { AppDispatch } from 'redux/store';

import slice from './slice';

const { setActiveItem, setOpenDrawer } = slice.actions;

const activeItem = (value: string[]) => (dispatch: AppDispatch) => {
  dispatch(setActiveItem(value));
};

const openDrawer = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(setOpenDrawer(value));
};

export default {
  activeItem,
  openDrawer
};
