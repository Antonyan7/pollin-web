import { ITask } from 'types/reduxTypes/tasksStateTypes';

import { ICreateOrEditTaskForm } from '../types';

export const getInitialTaskValues = (task?: ITask): ICreateOrEditTaskForm | null => {
  if (!task) {
    return null;
  }

  return {
    taskName: task?.name ?? '',
    patient: task?.patient?.name ?? '',
    dueDate: task?.dueDate ?? '',
    description: task?.description,
    priority: task?.priorityId ?? '',
    assign: task?.assignee?.name
  };
};
