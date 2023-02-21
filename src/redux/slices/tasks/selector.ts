import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.tasks;

const tasksList = createSelector([selector], (state) => state.tasks);
const taskDetails = createSelector([selector], (state) => state.taskDetails);
const isTaskDetailsLoading = createSelector([selector], (state) => state.isTaskDetailsLoading);
const isTasksLoading = createSelector([selector], (state) => state.isTasksListLoading);
const tasksStatusList = createSelector([selector], (state) => state.statuses);
const isTaskUpdated = createSelector([selector], (state) => state.isTaskUpdated);
const createdTaskId = createSelector([selector], (state) => state.createdTaskId);
const tasksPrioritiesList = createSelector([selector], (state) => state.priorities);
const isTasksCreateLoading = createSelector([selector], (state) => state.isTaskCreateLoading);
const isTaskStatusUpdated = createSelector([selector], (state) => state.isTaskStatusUpdated);
const isTasksReassignLoading = createSelector([selector], (state) => state.isTaskReassignLoading);

export default {
  tasksList,
  taskDetails,
  isTaskDetailsLoading,
  isTasksLoading,
  tasksStatusList,
  isTaskStatusUpdated,
  isTaskUpdated,
  tasksPrioritiesList,
  isTasksReassignLoading,
  createdTaskId,
  isTasksCreateLoading
};
