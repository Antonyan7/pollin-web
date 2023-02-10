import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';

export const findStatusByID = (id: string, statuses: ITaskStatusOption[]): ITaskStatusOption =>
  statuses.find((item) => item.statusId === id) as ITaskStatusOption;

export const findPriorityById = (id: string, priorities: ITaskPriorityOption[]): ITaskPriorityOption =>
  priorities.find((item) => item.id === id) as ITaskPriorityOption;
