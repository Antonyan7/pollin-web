import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.tasks;

const tasksList = createSelector([selector], (state) => state.tasks);
const isTasksLoading = createSelector([selector], (state) => state.isTasksListLoading);
const tasksStatusList = createSelector([selector], (state) => state.statuses);
const tasksPrioritiesList = createSelector([selector], (state) => state.priorities);

export default {
  tasksList,
  isTasksLoading,
  tasksStatusList,
  tasksPrioritiesList
};
