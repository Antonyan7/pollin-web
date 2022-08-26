import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.scheduleTemplates;

const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
const scheduleTemplates = createSelector([selector], (state) => state.scheduleTemplates);
const scheduleSingleTemplate = createSelector([selector], (state) => state.scheduleSingleTemplate);
const scheduleError = createSelector([selector], (state) => state.error);
const scheduleBlocks = createSelector([selector], (state) => state.scheduleBlock);
const scheduleResources = createSelector([selector], (state) => state.scheduleResources);

export default {
  scheduleError,
  serviceTypes,
  scheduleTemplates,
  scheduleSingleTemplate,
  scheduleBlocks,
  scheduleResources
};
