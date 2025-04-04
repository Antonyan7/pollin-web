import { SortOrder } from 'types/patient';

export interface ITasksListReqBody {
  page: number;
  sortByField?: TasksListSortFields;
  sortOrder?: SortOrder;
  // TODO: TEAMA-5355
  // filter: ITaskFilter[];
}

// interface ITaskFilter {
//   id: TaskFilter;
//   title: string;
// }

export interface ITaskReassignReqBody {
  staffUserId: string;
  taskId: string;
  reassignNotes?: string;
}

export enum TasksListSortFields {
  DUE = 'Due',
  PRIORITY = 'Priority',
  STATUS = 'Status',
  PATIENT_NAME = 'PatientName'
}

export interface ITasksPrioritiesResponse {
  priorities: ITaskPriorityOption[];
}

export interface ITasksStatusesResponse {
  variations: ITaskStatusOption[];
}

export interface ITaskPriorityOption {
  id: string;
  title: string;
}

export interface ITaskStatusOption {
  statusId: string;
  title: string;
  label: IStatusOptionLabel;
  actions: IStatusOptionAction[];
}
export interface IStatusOptionLabel {
  textColor: string;
  backgroundColor: string;
}
export interface IStatusOptionAction {
  id: string;
  title: string;
}
export interface ITaskCreateReqBody {
  task: ITaskCreate;
}

export interface ITaskEditReqBody {
  task: ITaskEdit;
}

export interface ITaskMutation {
  name: string;
  patientId?: string;
  dueDate: string;
  priorityId: string;
  description?: string;
}

export interface ITaskCreate extends ITaskMutation {
  assigneeId: string;
}

export interface ITaskEdit extends ITaskMutation {}

export enum ContextMenuAction {
  Pending = 'Pending',
  InProgress = 'InProgress',
  OnHold = 'OnHold',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Reassign = 'Reassign',
  Edit = 'Edit'
}
