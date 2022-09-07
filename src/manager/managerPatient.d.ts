import { IServiceProvider } from 'types/reduxTypes/booking';

export interface AlertDetailsProps {
  id: string;
  title: string;
  messages: string[];
}

export interface IAlertDetailsResponse {
  data: {
    alerts: AlertDetailsProps[];
  };
}
export interface IPatientListData {
  id: string;
  name: string;
  subString: string;
  doctorAssigned: string;
  alerts?: IPatientDataAlert;
  dateOfBirth: string;
  cycleStatus: string;
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
  patientsList: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
}
