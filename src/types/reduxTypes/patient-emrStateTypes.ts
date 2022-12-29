import { IPagination } from '@axios/axiosTypes';
import {
  IPatientAppointment,
  IPatientAppointmentsListFilter,
  PatientAppointmentsFilterOption
} from '@axios/booking/managerBookingTypes';
import {
  IEncounterDetailsProps,
  IPatientContactInformation,
  IProfileTestResults,
  ITestResultHistory,
  IUpdateEncounterNoteRequest,
  LatestTestResultType
} from '@axios/patientEmr/managerPatientEmrTypes';
import { IPatientsFilterOption, PatientListFilterType, SortOrder } from 'types/patient';

interface IProfileProps {
  isOverviewLoading: boolean;
  overview: PatientProfileOverview | null;
  testResultsHistory: ITestResultHistory[];
  profileTestResults: IProfileTestResults | null;
  isTestResultsHistoryLoading: boolean;
  isProfileTestResultsLoading: boolean;
}

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  encounters: IEncountersProps;
  isPatientProfileLoading: boolean;
  isPatientsListLoading: boolean;
  isEncountersListLoading: boolean;
  isPatientsFiltersLoading: boolean;
  isEncountersAddendumLoading: boolean;
  isEncountersFiltersLoading: boolean;
  isEncountersDetailsLoading: boolean;
  isCreateEncounterNoteLoading: boolean;
  isUpdateEncounterNoteLoading: boolean;
  isUpdateEncounterAddendumLoading: boolean;
  isCreateEncounterAddendumLoading: boolean;
  isPatientContactInformationLoading: boolean;
  isPatientAlertViewOpen: boolean;
  error: Error | null;
  patientProfile: PatientProfile | null;
  isPatientHighlightsLoading: boolean;
  isPatientHighlightIntakeComplete: boolean;
  isPatientHighlightIntakeReminderActive: boolean;
  patientHighlightHeader: PatientHighlightHeader;
  patientHighlights: PatientHighlight[] | null;
  patientAppointments: IPatientAppointmentsProps;
  isPatientAppointmentFiltersLoading: boolean;
  latestTestResults: ITestResultLatest[];
  profile: IProfileProps;
  currentPatientAppointmentFilterField: string;
  contactInformation: IPatientContactInformation;
}

export interface IItem {
  title: string;
  lineItems: {
    title: string;
    uuid?: string;
  }[];
}

export interface PatientProfileOverview {
  widgetTitle: string;
  items: IItem[];
}

export interface PatientHighlightHeader {
  contact: {
    uiid: string;
    title: string;
  };
  ohip: {
    uiid: string;
    title: string;
  };
  doctor: {
    uiid: string;
    title: string;
  };
}

export interface PatientHighlight {
  uiid?: string;
  title: string;
  items: string[];
}

export interface PatientProfile {
  imageURL: string;
  subTitle: string;
  title: string;
  cycleStatus: string | boolean;
}

export interface IEncounterDataProps {
  title: string;
  content: string;
  author: string;
  createdOn: string;
  updatedOn?: string;
}

interface IEncounterFilterOption {
  id: string;
  title: string;
}

export interface IEncounterFilterProps {
  type: string;
  title: string;
  options: IEncounterFilterOption[];
}

export interface IEncounterFilters {
  filters: IEncounterFilterProps[];
}

interface IPatientsProps {
  searchFilters: IFilterCategory[];
  list: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
  currentPatientId: string;
  currentEncounterId: string;
}

export interface ITestResultLatest {
  title: string;
  dateCollected: string;
  result: LatestTestResultType;
}

export interface ILatestTestResult {
  testResults: ITestResultLatest[];
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

export interface AlertDetailsMessagesProps {
  title: string;
}

export interface AlertDetailsProps {
  id: string;
  title: string;
  messages: AlertDetailsMessagesProps[];
}

export interface IEncounterDetailsResponse {
  encounter: IEncounterDetailsProps;
}

interface IEncountersProps {
  list: IEncounterList;
  filters: IEncounterFilterProps[] | null;
  types: IEncounterType[];
  encounterDetails: IEncounterDetailsProps | null;
}

export interface IEncounterType {
  id: string;
  title: string;
}
export interface IEncounterList extends IPagination {
  encounters: IEncounterListItem[];
}

export interface IEncounterListItem {
  id: string;
  title: string;
  createdOn: string;
  contentPreview: string;
  author: string;
}

interface IEncounterNoteProps {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

export interface IPatientAppointmentsList extends IPagination {
  appointments: IPatientAppointment[] | null;
}

export enum AppointmentResponseStatus {
  IDLE = 'idle',
  SUCCESS = 'success',
  FAIL = 'fail'
}

export interface IPatientAppointmentsProps {
  list: IPatientAppointmentsList;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | null;
  order: SortOrder | null;
  filters: IPatientAppointmentsListFilter[] | null;
  selectedFilters: PatientAppointmentsFilterOption[];
  status: AppointmentResponseStatus;
}

export interface ICreateEncounterNoteProps extends IEncounterNoteProps {}
export interface IUpdateEncounterNoteProps extends IUpdateEncounterNoteRequest {}
