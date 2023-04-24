export interface ICreateOrEditTaskForm {
  taskName: string;
  patient?: string;
  dueDate: string;
  description?: string;
  priority: string;
  assign?: string;
}
