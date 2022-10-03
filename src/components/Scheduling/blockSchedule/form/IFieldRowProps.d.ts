import { IBlockScheduleForm } from './initialValues';

export interface IFieldRowProps {
  fieldLabel: string;
  fieldName: keyof IBlockScheduleForm;
}
