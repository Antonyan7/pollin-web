import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { ITasksManager, ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const createReducer = <T extends SliceCaseReducers<ITasksManager>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
  setTasksList(state, action: IAction<ITasksProps>) {
    state.tasks = action.payload;
  },
  setTasksLoadingState(state, action: IAction<boolean>) {
    state.isTasksListLoading = action.payload;
  },
  setTaskPriorities(state, action: IAction<ITaskPriorityOption[]>) {
    state.priorities = action.payload;
  },
  setTaskStatuses(state, action: IAction<ITaskStatusOption[]>) {
    state.statuses = action.payload;
  }
});

export default reducers;
