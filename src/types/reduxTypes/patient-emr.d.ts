import { IPagination } from '@axios/axios';

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  encounters: IEncountersProps;
  isPatientsListLoading: boolean;
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

export interface AlertDetailsProps {
  id: string;
  title: string;
  messages: string[];
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
  content: string;
  addendums: IAddendum[];
}

export interface IAddendum {
  id: string;
  title: string;
  date: string;
  content: string;
}
