import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.views;

export const redirection = createSelector([selector], (state) => state.redirection);
export const menu = createSelector([selector], (state) => state.menu);
export const modals = createSelector([selector], (state) => state.modals);
export const toastNotificationPopUp = createSelector([selector], (state) => state.toastNotificationPopUp);

export default {
  redirection,
  menu,
  modals,
  toastNotificationPopUp
};
