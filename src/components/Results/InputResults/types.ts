import { Control } from 'react-hook-form';
import { ITestResultsDetails, TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';

export enum InputResultTestType {
  InHouse = 'inHouse',
  External = 'external'
}

export interface InputResultsProps {
  testType: InputResultTestType;
}

interface InputResultsHeaderSectionRow {
  label: string;
  value: string;
}

export interface InputResultsHeaderSectionProps {
  title: string;
  rows: InputResultsHeaderSectionRow[];
}

export interface InputTestResultsHeaderProps extends Partial<ITestResultsDetails> {
  specimenId?: string;
  currentFormFieldName: string;
}

export interface IMeasurementsFieldValues {
  [data: string]: { resultType?: TestResultMeasurementType; dateReceived: string; result: string }[];
}

export interface IMeasurementsControl extends Control<IMeasurementsFieldValues> {}

export interface IMeasurementListField {
  name:
    | `${string}`
    | `${string}.${number}`
    | `${string}.${number}.result`
    | `${string}.${number}.dateReceived`
    | `${string}.${number}.resultType`;
  control: IMeasurementsControl;
}

export interface ResultsSaveButtonProps {
  currentFormFieldNames: string[];
  shouldSaveAsCompleted?: boolean;
}

export interface MeasurementListFormProps {
  specimenId?: string;
}

export enum InputResultsSubmitButtonStates {
  Completed = 'completed',
  Pending = 'pending',
  Final = 'final'
}
