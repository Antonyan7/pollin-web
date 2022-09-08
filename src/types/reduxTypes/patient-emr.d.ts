import { IPagination } from '@axios/axios';

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  encounters: IEncountersProps;
  error: Error | null;
}

interface IPatientsProps {
  searchFilters: IFilterCategory[];
  list: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
}

export interface IFilterCategory {
  id: string;
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

interface IEncountersProps {}
