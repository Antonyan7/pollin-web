import { IServiceProvider } from 'types/reduxTypes/booking';

export interface AlertDetailsProps {
  id: string;
  title: string;
  messages: string[];
}

export interface IAlertDetailsResponse {
  alerts: AlertDetailsProps[];
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

export interface IPatientList {
  patients: IPatientListData[];
  pageSize: number;
  currentPage: number;
  totalItems: number;
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

export interface IPatientsProps {
  error: Error | null;
  searchFilters: IFilterCategory[];
  patientsList: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
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
export interface IFilterCategory {
  id: string;
  type: PatientListFilterType;
  title: string;
  options: IPatientsFilterOption[];
}
export interface IPatientsFiltersResponse {
  filters: IFilterCategory[];
}
