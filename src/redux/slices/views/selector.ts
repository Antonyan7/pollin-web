import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.views;

export const redirection = createSelector([selector], (state) => state.redirection);
export const menu = createSelector([selector], (state) => state.menu);
export const modal = createSelector([selector], (state) => state.modal);
export const alertPopUp = createSelector([selector], (state) => state.alertPopUp);

export default {
  redirection,
  menu,
  modal,
  alertPopUp
};
