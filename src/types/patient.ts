import { SetStateAction } from 'react';

import { AddendumsProps } from '../manager/patientEmr/managerPatientEmrTypes';

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
export interface CustomAlerts {
  id?: string;
  title: string;
  description: string;
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum AvailablePages {
  Encounters = 'Encounters',
  Profile = 'Patient Profile',
  Orders = 'Orders & Results',
  MedicalBackground = 'Medical Background',
  Medications = 'Medications'
}

export enum PatientListField {
  NAME = 'Name',
  DOCTOR = 'Doctor',
  ALERT = 'Alert',
  DATE_OF_BIRTH = 'DateOfBirth',
  CYCLE_STATUS = 'CycleStatus'
}

export enum PatientListFilterType {
  DOCTOR = 'Doctor',
  CYCLE_STATUS = 'CycleStatus',
  ALERTS = 'Alert'
}

export enum EncounterFilterTypes {
  doctor = 'Doctor',
  alert = 'Alert',
  cycleStatus = 'CycleStatus',
  author = 'Author',
  encounterType = 'EncounterType'
}

export interface IPatientsFilterOption {
  type: PatientListFilterType | string;
  id: string;
  title: string;
}
export interface IEncountersFilterOption {
  type: EncounterFilterTypes | string;
  id: string;
}

export interface IPatientsReqBody {
  searchString: string;
  sortByField?: PatientListField;
  sortOrder?: SortOrder;
  filters?: Omit<IPatientsFilterOption, 'title'>[];
  page?: number;
}

export interface IEncountersReqBody {
  patientId: string;
  page?: number;
  searchString?: string;
  filters?: IEncountersFilterOption[];
}

export interface IEncountersFormBody {
  content: string;
  encountersTypeId: string;
  patientId?: string;
  id?: string;
  encounterId?: string;
  appointmentId?: string;
}

export interface IEncountersFormDefaultProps {
  id?: string;
  content: string;
}

export enum EncountersFormField {
  EditorContentField = 'content',
  EncountersTypeField = 'encountersTypeId',
  AppointmentsField = 'appointmentId'
}

export interface IHeadCell {
  id: string;
  label: string;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  paddingLeft: string | number;
  isSortable: boolean;
}

export enum CycleStatuses {
  notActive = 'Not Active'
}

export enum SimpleEditorMode {
  Add_Note = 'add_note',
  Edit_Note = 'edit_note',
  Add_Addendum = 'add_addendum',
  Edit_Addendum = 'edit_addendum'
}

export enum ISortOrder {
  Asc = 'Asc',
  Desc = 'Desc'
}

export interface SimpleEditorProps {
  editorValue?: string;
  setEditorValue: React.Dispatch<SetStateAction<string>>;
  mode: SimpleEditorMode;
  handleCancel?: () => void;
  handleSave?: (values: IEncountersFormBody) => void;
  secondPartAddendums?: AddendumsProps[];
  loadingButtonState?: boolean;
}
