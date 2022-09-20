import { initialValues } from './initialValues';

export interface IFieldRowProps {
  fieldLabel: string;
  fieldName: keyof typeof initialValues;
}
