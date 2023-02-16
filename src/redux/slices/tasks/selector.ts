import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.tasks;

const tasksList = createSelector([selector], (state) => state.tasks);
const taskDetails = createSelector([selector], (state) => state.taskDetails);
const isTaskDetailsLoading = createSelector([selector], (state) => state.isTaskDetailsLoading);
const isTasksLoading = createSelector([selector], (state) => state.isTasksListLoading);
const tasksStatusList = createSelector([selector], (state) => state.statuses);
const isTaskUpdated = createSelector([selector], (state) => state.isTaskUpdated);
const tasksPrioritiesList = createSelector([selector], (state) => state.priorities);
const isTasksCreateLoading = createSelector([selector], (state) => state.isTaskCreateLoading);

export default {
  tasksList,
  taskDetails,
  isTaskDetailsLoading,
  isTasksLoading,
  tasksStatusList,
  isTaskUpdated,
  tasksPrioritiesList,
  isTasksCreateLoading
};
