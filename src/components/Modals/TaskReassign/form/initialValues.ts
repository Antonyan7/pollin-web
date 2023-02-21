export interface ICreateTaskForm {
  taskName: string;
  patient?: string;
  dueDate: Date | null;
  description?: string;
  priority: string;
  assign: string;
  notes: string;
}

export const initialValues: ICreateTaskForm = {
  taskName: '',
  patient: '',
  dueDate: null,
  description: '',
  priority: '',
  assign: '',
  notes: ''
};
