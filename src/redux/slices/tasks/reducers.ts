import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { ITaskDetails, ITasksManager, ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const createReducer = <T extends SliceCaseReducers<ITasksManager>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setTaskDetails(state, action: IAction<ITaskDetails>) {
    state.taskDetails = action.payload;
  },
  setIsTaskDetailsLoading(state, action: IAction<boolean>) {
    state.isTaskDetailsLoading = action.payload;
  },
  setTasksList(state, action: IAction<ITasksProps>) {
    state.tasks = action.payload;
  },
  setTasksLoadingState(state, action: IAction<boolean>) {
    state.isTasksListLoading = action.payload;
  },
  setIsTaskStatusUpdated(state, action: IAction<boolean>) {
    state.isTaskStatusUpdated = action.payload;
  },
  setIsTaskReassignLoading(state, action: IAction<boolean>) {
    state.isTaskReassignLoading = action.payload;
  },
  setIsTaskReassigned(state, action: IAction<boolean>) {
    state.isTaskReassigned = action.payload;
  },
  setTaskCreateLoadingState(state, action: IAction<boolean>) {
    state.isTaskCreateLoading = action.payload;
  },
  setCreatedTaskId(state, action: IAction<string>) {
    state.createdTaskId = action.payload;
  },
  setTaskPriorities(state, action: IAction<ITaskPriorityOption[]>) {
    state.priorities = action.payload;
  },
  setTaskStatuses(state, action: IAction<ITaskStatusOption[]>) {
    state.statuses = action.payload;
  },
  setIsTaskUpdated(state, action: IAction<boolean>) {
    state.isTaskUpdated = action.payload;
  },
  setIsTaskUpdating(state, action: IAction<boolean>) {
    state.isTaskUpdating = action.payload;
  }
});

export default reducers;
