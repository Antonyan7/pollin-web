import { ITasksManager } from 'types/reduxTypes/tasksStateTypes';

export const getInitialState = (): ITasksManager => ({
  tasks: {
    tasks: [],
    currentPage: 1,
    pageSize: 25,
    totalItems: 0
  },
  isTaskCreateLoading: false,
  isTaskStatusUpdated: false,
  isStatusChangeLoading: false,
  isTaskReassignLoading: false,
  isTaskReassigned: false,
  createdTaskId: '',
  priorities: [],
  isTasksListLoading: false,
  statuses: [],
  isTaskUpdated: false,
  taskDetails: {
    name: '',
    patient: { name: '' },
    dueDate: '',
    description: '',
    priorityId: '',
    assignee: {
      name: '',
      date: ''
    },
    createdBy: {
      name: '',
      date: ''
    },
    statusId: '',
    reassigningHistory: []
  },
  isTaskDetailsLoading: false
});
