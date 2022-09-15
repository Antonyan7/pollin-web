import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.scheduleTemplates;

const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
const scheduleTemplates = createSelector([selector], (state) => state.scheduleTemplates);
const scheduleSingleTemplate = createSelector([selector], (state) => state.scheduleSingleTemplate);
const scheduleListLoadingStatus = createSelector([selector], (state) => state.schedulingListLoadingStatus);
const scheduleError = createSelector([selector], (state) => state.error);
const scheduleCalendarLoading = createSelector([selector], (state) => state.scheduleCalendarLoading);
const scheduleApplySuccess = createSelector([selector], (state) => state.success);
const scheduleBlocks = createSelector([selector], (state) => state.scheduleBlock);
const scheduleResources = createSelector([selector], (state) => state.scheduleResources);

export default {
  scheduleError,
  serviceTypes,
  scheduleTemplates,
  scheduleSingleTemplate,
  scheduleListLoadingStatus,
  scheduleBlocks,
  scheduleResources,
  scheduleCalendarLoading,
  scheduleApplySuccess
};
