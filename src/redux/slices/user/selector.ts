import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.user;

export const isAuthChecked = createSelector([selector], (state) => state.isAuthChecked);
export const user = createSelector([selector], (state) => state.user);
export const authError = createSelector([selector], (state) => state.authError);

export default { isAuthChecked, user, authError };
