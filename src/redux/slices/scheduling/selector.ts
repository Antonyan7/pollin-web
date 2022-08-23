import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.scheduleTemplates;

const scheduleTemplates = createSelector([selector], (state) => state.scheduleTemplates);
const scheduleError = createSelector([selector], (state) => state.error);

export default {
  scheduleError,
  scheduleTemplates
};
