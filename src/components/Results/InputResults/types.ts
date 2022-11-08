import { Control } from 'react-hook-form';
import { ITestResultsDetails, TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';

interface InputResultsHeaderSectionRow {
  label: string;
  value: string;
}

export interface InputResultsHeaderSectionProps {
  title: string;
  rows: InputResultsHeaderSectionRow[];
}

export interface InputTestResultsHeaderProps extends Partial<ITestResultsDetails> {}

export interface IMeasurementListField {
  name:
    | 'data'
    | `data.${number}`
    | `data.${number}.result`
    | `data.${number}.dateReceived`
    | `data.${number}.resultType`;
  control: Control<{
    data: { resultType: TestResultMeasurementType | undefined; dateReceived: string; result: string }[] | undefined;
  }>;
}
