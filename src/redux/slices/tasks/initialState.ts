import { ITasksManager } from 'types/reduxTypes/tasksStateTypes';

export const getInitialState = (): ITasksManager => ({
  tasks: {
    tasks: [],
    currentPage: 1,
    pageSize: 25,
    totalItems: 0
  },
  isTaskCreateLoading: false,
  createdTaskId: '',
  priorities: [],
  isTasksListLoading: false,
  statuses: [],
  error: null,
  isTaskUpdated: false
});
