import { IBlockScheduleForm } from './initialValues';

export interface IFieldRowProps {
  dataCyId: string;
  fieldLabel: string;
  fieldName: keyof IBlockScheduleForm;
}
