import { PatientListFilterType } from 'types/patient';
import { IServiceProvider } from 'types/reduxTypes/booking';
import { AlertDetailsProps, IEncounterListItem, IPatientListData } from 'types/reduxTypes/patient-emr';

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
export interface IPatientsListResponse {
  patients: IPatientListData[];
}

export interface IPatientEncountersListResponse {
  encounters: IEncounterListItem[];
}

interface IEncounterNoteRequest {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

interface IEncounterAddendumRequest {
  encounterId: string;
  content: string;
}

export interface ICreateEncounterNoteRequest extends IEncounterNoteRequest {}
export interface IUpdateEncounterNoteRequest extends IEncounterNoteRequest {}

export interface ICreateEncounterAddendumRequest extends IEncounterAddendumRequest {}
export interface IUpdateEncounterAddendumRequest extends IEncounterAddendumRequest {}
