import { IPagination } from '@axios/axiosTypes';
import {
  IEncounterDetailsProps,
  IUpdateEncounterNoteRequest,
  LatestTestResultType
} from '@axios/patientEmr/managerPatientEmrTypes';
import { IPatientsFilterOption, PatientListFilterType } from 'types/patient';

interface IProfileProps {
  isOverviewLoading: boolean;
  overview: PatientProfileOverview | null;
}

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  encounters: IEncountersProps;
  isPatientsListLoading: boolean;
  isEncountersListLoading: boolean;
  isPatientsFiltersLoading: boolean;
  isEncountersAddendumLoading: boolean;
  isEncountersFiltersLoading: boolean;
  error: Error | null;
  patientProfile: PatientProfile | null;
  patientHighlights: PatientHighlight[] | null;
  latestTestResults: ITestResultLatest[];
  profile: IProfileProps;
}

export interface PatientProfileOverview {
  widgetTitle: string;
  items: {
    title: string;
    lineItems: {
      title: string;
      uuid?: string;
    }[];
  }[];
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

export interface ICreateEncounterNoteProps extends IEncounterNoteProps {}
export interface IUpdateEncounterNoteProps extends IUpdateEncounterNoteRequest {}
