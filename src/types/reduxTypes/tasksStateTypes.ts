import { IPagination } from '@axios/axiosTypes';
import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';

export interface ITasksManager {
  tasks: ITasksProps;
  isTasksListLoading: boolean;
  error: Error | null;
  statuses: ITaskStatusOption[];
  isTaskUpdated: boolean;
  isTaskCreateLoading: boolean;
  createdTaskId: string;
  priorities: ITaskPriorityOption[];
}

export interface ITasksProps extends IPagination {
  tasks: ITask[];
}

export interface ITask {
  uuid: string;
  name: string;
  patient: IPatient;
  assignee: IAssignee;
  dueDate: string;
  description: string;
  statusId: string;
  priorityId: string;
}

export interface IAssignee {
  name: string;
}

export interface IPatient {
  name: string;
}

export interface ITaskCreateProps {
  uuid: string;
}
