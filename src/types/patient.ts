import { SetStateAction } from 'react';

export interface IPatient {
  id: string;
  name: string;
  subString: string;
  age: number;
  gender: string;
  partnerCount: number;
  doctor: string;
  alerts: boolean;
  alertsCount: number;
  alertInfo?: AlertInfo[];
  dateOfBirth: string;
  cycleStatus: CycleStatuses;
}
interface AlertInfo {
  title: string;
  messages: {
    title: string;
  };
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

export enum PatientListField {
  NAME = 'name',
  DOCTOR = 'doctor',
  ALERT = 'alert',
  DATE_OF_BIRTH = 'dateOfBirth',
  CYCLE_STATUS = 'cycleStatus'
}

export enum PatientListFilterType {
  DOCTOR = 'doctor',
  CYCLE_STATUS = 'cycleStatus',
  ALERTS = 'alerts'
}

export interface IPatientsFilterOption {
  type: PatientListFilterType | string;
  id: string;
}

export interface IPatientsReqBody {
  searchString?: string;
  sortByField?: PatientListField;
  sortOrder?: SortOrder;
  filters?: IPatientsFilterOption[];
  page: number;
}

export interface IHeadCell {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
  paddingLeft: string | number;
  isSortable: boolean;
}

export enum CycleStatuses {
  notActive = 'Not Active'
}

export enum SimpleEditorMode {
  Add = 'add',
  Edit = 'edit'
}

export interface SimpleEditorProps {
  editorValue: string;
  setEditorValue: React.Dispatch<SetStateAction<string>>;
  mode: SimpleEditorMode;
}
