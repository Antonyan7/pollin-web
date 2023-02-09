import { ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';

export const findStatusByID = (id: string, statuses: ITaskStatusOption[]): ITaskStatusOption =>
  statuses.find((item) => item.statusId === id) as ITaskStatusOption;
