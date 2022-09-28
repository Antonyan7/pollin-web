import { IPagination } from '@axios/axios';
import { IGetPatientsResponse } from '@axios/managerPatientEmr';

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  encounters: IEncountersProps;
  isPatientsListLoading: boolean;
  isEncountersListLoading: boolean;
  isPatientsFiltersLoading: boolean;
  error: Error | null;
}

interface IPatientsProps {
  searchFilters: IFilterCategory[];
  list: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
  currentPatientId: string;
}

export interface IFilterCategory {
  type: PatientListFilterType;
  title: string;
  options: IPatientsFilterOption[];
}
export interface IPatientList extends IPagination {
  patients: IPatientListData[];
}

export interface IPatientListData {
  id: string;
  name: string;
  subString: string;
  doctorAssigned: string;
  alertsCount: number;
  dateOfBirth: string;
  cycleStatus: string;
  doctor: string;
}

export interface IPatientsResponse {
  patients: IGetPatientsResponse;
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

export interface AlertDetailsMessagesProps {
  title: string;
}

export interface AlertDetailsProps {
  id: string;
  title: string;
  messages: AlertDetailsMessagesProps[];
}

interface IEncountersProps {
  list: IEncounterList;
}

export interface IEncounterList extends IPagination {
  encounters: IEncounterListItem[];
}

export interface IEncounterListItem {
  id: string;
  title: string;
  date: string;
  contentPreview: string;
  author: string;
}

export interface IAddendum {
  id: string;
  title: string;
  date: string;
  content: string;
}
interface IEncounterNoteProps {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

interface IEncountersProps {}

export interface ICreateEncounterNoteProps extends IEncounterNoteProps {}
export interface IUpdateEncounterNoteProps extends IEncounterNoteProps {}
