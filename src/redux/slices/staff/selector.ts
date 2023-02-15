import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.staff;

export const staffUsers = createSelector([selector], (state) => state.staff);
export const isStaffLoading = createSelector([selector], (state) => state.isStaffLoading);

export default { staffUsers, isStaffLoading };
