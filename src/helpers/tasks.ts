import { ITaskPriorityOption, ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';
import { IStaff } from 'types/reduxTypes/staff';

export const findStatusByID = (id: string, statuses: ITaskStatusOption[]): ITaskStatusOption =>
  statuses.find((item) => item.statusId === id) as ITaskStatusOption;

export const findPriorityById = (id: string, priorities: ITaskPriorityOption[]): ITaskPriorityOption =>
  priorities.find((item) => item.id === id) as ITaskPriorityOption;

export const findAssigneeById = (id: string, assignees: IStaff[]) => assignees.find((item) => item.id === id);
