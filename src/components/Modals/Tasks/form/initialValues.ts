import { ICreateOrEditTaskForm } from '../types';

export const initialValues: ICreateOrEditTaskForm = {
  taskName: '',
  patient: '',
  dueDate: '',
  description: '',
  priority: '',
  assign: ''
};
