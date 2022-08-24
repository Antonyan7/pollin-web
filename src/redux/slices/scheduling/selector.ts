import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.scheduleTemplates;

const scheduleTemplates = createSelector([selector], (state) => state.scheduleTemplates);
const scheduleError = createSelector([selector], (state) => state.error);
const scheduleBlocks = createSelector([selector], (state) => state.scheduleBlock);
const scheduleResources = createSelector([selector], (state) => state.scheduleResources);

export default {
  scheduleError,
  scheduleTemplates,
  scheduleBlocks,
  scheduleResources
};
