export interface ICreateTaskForm {
  taskName: string;
  patient?: string;
  dueDate: string;
  description?: string;
  priority: string;
  assign: string;
}

export const initialValues: ICreateTaskForm = {
  taskName: '',
  patient: '',
  dueDate: '',
  description: '',
  priority: '',
  assign: ''
};
