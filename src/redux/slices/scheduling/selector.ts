import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.scheduleTemplates;

const serviceTypes = createSelector([selector], (state) => state.serviceTypes);
const scheduleTemplates = createSelector([selector], (state) => state.scheduleTemplates);
const scheduleSingleTemplate = createSelector([selector], (state) => state.scheduleSingleTemplate);
const scheduleListLoadingStatus = createSelector([selector], (state) => state.schedulingListLoadingStatus);
const scheduleCalendarLoading = createSelector([selector], (state) => state.scheduleCalendarLoading);
const scheduleBlocks = createSelector([selector], (state) => state.scheduleBlock);
const scheduleResources = createSelector([selector], (state) => state.scheduleResources);
const scheduleOverrides = createSelector([selector], (state) => state.overrides);
const scheduleLoading = createSelector([selector], (state) => state.scheduleLoading);
const isServiceTypesLoading = createSelector([selector], (state) => state.isServiceTypesLoading);
const isApplyingSchedule = createSelector([selector], (state) => state.isApplyingSchedule);

export default {
  serviceTypes,
  scheduleTemplates,
  scheduleSingleTemplate,
  scheduleListLoadingStatus,
  scheduleBlocks,
  scheduleOverrides,
  scheduleResources,
  scheduleCalendarLoading,
  scheduleLoading,
  isServiceTypesLoading,
  isApplyingSchedule
};
