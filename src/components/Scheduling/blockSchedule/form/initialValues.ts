export interface IBlockScheduleForm {
  resourceId: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  placeholderLabel: string;
}

export const initialValues: IBlockScheduleForm = {
  resourceId: '',
  startDate: null,
  endDate: null,
  placeholderLabel: ''
};
