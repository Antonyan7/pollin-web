import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.menu;

const openItem = createSelector([selector], (state) => state.openItem);
const drawerOpen = createSelector([selector], (state) => state.drawerOpen);

export default {
  openItem,
  drawerOpen
};
