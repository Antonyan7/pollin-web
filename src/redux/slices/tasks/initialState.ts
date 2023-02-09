import { ITasksManager } from 'types/reduxTypes/tasksStateTypes';

export const getInitialState = (): ITasksManager => ({
  tasks: {
    tasks: [],
    currentPage: 1,
    pageSize: 25,
    totalItems: 0
  },
  isTasksListLoading: false,
  statuses: [],
  error: null
});
