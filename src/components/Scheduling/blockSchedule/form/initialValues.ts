export interface IBlockScheduleForm {
  resourceId: string;
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
  placeholderLabel: string;
}

export const initialValues: IBlockScheduleForm = {
  resourceId: '',
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  placeholderLabel: ''
};
