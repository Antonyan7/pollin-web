import { Control } from 'react-hook-form';
import { ITestResultsItem } from '@axios/results/resultsManagerTypes';
import { ITestResultAttachment, ITestResultsDetails } from 'types/reduxTypes/resultsStateTypes';

// Interfaces
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
  isInHouseTest: boolean;
}

export interface IMeasurementsFieldValues {
  [data: `${string}`]: {
    items: ITestResultsItem[];
    id: string;
    comment?: string;
    attachments?: ITestResultAttachment[];
  };
}

export interface IMeasurementsControl extends Control<IMeasurementsFieldValues> {}

export interface IMeasurementListField {
  name:
    | `${string}`
    | `${string}.items`
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
  testType?: string;
}
export interface ListHeaderProps {
  isInHouseTest: boolean;
}

// Enums

export enum InputResultsSubmitButtonStates {
  Completed = 'completed',
  Pending = 'pending',
  Final = 'final'
}

export enum InputResultTestType {
  InHouse = 'inHouse',
  External = 'external'
}
