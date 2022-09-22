import { PatientListFilterType } from 'types/patient';
import { IServiceProvider } from 'types/reduxTypes/booking';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emr';

export interface IAlertDetailsResponse {
  alerts: AlertDetailsProps[];
}

export interface IPatientDataAlert {
  count: number;
}

export interface BlockSchedulingProps {
  resourceId: string;
  startDate: string;
  endDate: string;
  placeholderLabel: string;
  slots?: IServiceProvider[];
}

export interface IOptionsProps {
  title?: string;
  type: string;
  id: string;
  titleName: string;
}

export interface GroupedByTitlesProps {
  options: IOptionsProps;
}

export interface IPatientsFilterOption {
  type: PatientListFilterType;
  id: string;
}

export interface IPatientsFiltersResponse {
  filters: IFilterCategory[];
}

interface IEncounterNoteRequest {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

interface IEncounterNoteResponse {
  code: string;
  message?: string;
  title?: string;
}

export interface ICreateEncounterNoteRequest extends IEncounterNoteRequest {}
export interface IUpdateEncounterNoteRequest extends IEncounterNoteRequest {}

export interface ICreateEncounterNoteResponse extends IEncounterNoteResponse {}
export interface IUpdateEncounterNoteResponse extends IEncounterNoteResponse {}
