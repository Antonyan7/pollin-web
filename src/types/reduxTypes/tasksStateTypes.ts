import { IPagination } from '@axios/axiosTypes';
import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';

export interface ITasksManager {
  tasks: ITasksProps;
  isTasksListLoading: boolean;
  error: Error | null;
  statuses: ITaskStatusOption[];
  isTaskUpdated: boolean;
  isTaskReassigned: boolean;
  isStatusChangeLoading: boolean;
  isTaskReassignLoading: boolean;
  isTaskCreateLoading: boolean;
  isTaskStatusUpdated: boolean;
  createdTaskId: string;
  priorities: ITaskPriorityOption[];
  taskDetails: ITaskDetails;
  isTaskDetailsLoading: boolean;
}

export interface ITasksDetailsProps {
  task: ITaskDetails;
}

export interface ITaskDetails {
  name: string;
  patient?: { name: string };
  dueDate: string;
  description?: string;
  priorityId: string;
  assignee: {
    name: string;
    date: string;
  };
  createdBy: {
    name: string;
    date: string;
  };
  statusId: string;
  reassigningHistory: ReassigningHistory[];
}

export interface ReassigningHistory {
  assignor: { name: string };
  date: string;
  note: string;
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
