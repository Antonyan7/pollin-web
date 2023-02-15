import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.tasks;

const tasksList = createSelector([selector], (state) => state.tasks);
const isTasksLoading = createSelector([selector], (state) => state.isTasksListLoading);
const tasksStatusList = createSelector([selector], (state) => state.statuses);
const isTaskUpdated = createSelector([selector], (state) => state.isTaskUpdated);
const tasksPrioritiesList = createSelector([selector], (state) => state.priorities);
const isTasksCreateLoading = createSelector([selector], (state) => state.isTaskCreateLoading);

export default {
  tasksList,
  isTasksLoading,
  tasksStatusList,
  isTaskUpdated,
  tasksPrioritiesList,
  isTasksCreateLoading
};
