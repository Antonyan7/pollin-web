import { SortOrder } from 'types/patient';

export interface ITasksListReqBody {
  page: number;
  sortByField?: TasksListSortFields;
  sortOrder?: SortOrder;
  onlyUserTasks?: boolean;
}

export enum TasksListSortFields {
  DUE = 'Due',
  PRIORITY = 'Priority',
  STATUS = 'Status',
  PATIENT_NAME = 'PatientName'
}

export interface ITasksStatusesResponse {
  options: ITaskStatusOption[];
}

export interface ITaskStatusOption {
  statusId: string;
  title: string;
  label: IStatusOptionLabel;
  actions: IStatusOptionAction[];
}
export interface IStatusOptionLabel {
  text: string;
  background: string;
}
export interface IStatusOptionAction {
  id: string;
  title: string;
}
