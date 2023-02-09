import { IPagination } from '@axios/axiosTypes';
import { ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';

export interface ITasksManager {
  tasks: ITasksProps;
  isTasksListLoading: boolean;
  error: Error | null;
  statuses: ITaskStatusOption[];
}

export interface ITasksProps extends IPagination {
  tasks: ITask[];
}

export interface ITask {
  uuid: string;
  name: string;
  patient: IPatient;
  dueDate: string;
  description: string;
  statusId: string;
  priorityId: string;
}

export interface IPatient {
  name: string;
}
