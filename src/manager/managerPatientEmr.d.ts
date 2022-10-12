import { PatientListFilterType } from 'types/patient';
import { IServiceProvider } from 'types/reduxTypes/booking';
import { AlertDetailsProps, IEncounterListItem, IEncounterTypes, IPatientListData } from 'types/reduxTypes/patient-emr';

export interface IGetPatientsRequestBody {
  name: string;
  page?: number;
}

export interface IGetPatientsResponse {
  patients: IPatientsData[];
}

export interface IPatientsData {
  id: string;
  title: string;
}

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
  type: PatientListFilterType;
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

export interface IEncounterTypesResponse {
  encountersTypes: IEncounterTypes;
}

export interface AddendumsProps {
  id: string;
  content: string;
  author: string;
  date: Date | string;
  isEdited: boolean;
}

export interface IEncounterDetailsProps {
  id: string;
  title: string;
  author: string;
  createdOn: Date | string;
  updatedOn?: Date | string;
  content: string;
  addendums: AddendumsProps;
}

export interface IPatientProfileResponse {
  title: string;
  subTitle: string;
  cycleStatus: string;
  imageURL: string;
}

export interface IPatientHighlightResponse {
  highlights: {
    uuid: string;
    title: string;
    items: string[];
  }[];
}

export interface IPatientPartnerData {
  name: string;
  patientId: string;
  pronoun: string;
  subTitle: string;
  relation: string;
}

interface IPatientHighlightDetailPartner {
  type: 'Partner';
  title: string; // title of the modal field
  partner: IPatientPartnerData; // values of the modal field
}

export interface IPatientMedicationData {
  title: string;
  dosage: string;
}

interface IPatientHighlightDetailMedications {
  type: 'Medications';
  title: string; // title of the modal field
  medications: IPatientMedicationData[]; // values of the modal field
}

interface IPatientHighlightDetailLineItems {
  type: 'LineItems';
  title: string; // title of the modal field
  lineItems: string[]; // values of the modal field
}

type PatientHighlightDetail =
  | IPatientHighlightDetailPartner
  | IPatientHighlightDetailMedications
  | IPatientHighlightDetailLineItems;

export interface IPatientHighlightDetailsResponse {
  title: string; // Title of modal
  highlightDetails: PatientHighlightDetail[]; // modal type and entries
}

export interface ICreateEncounterNoteRequest extends IEncounterNoteRequest {}
export interface IUpdateEncounterNoteRequest {
  id: string;
  content: string;
}

export interface ICreateEncounterAddendumRequest extends IEncounterAddendumRequest {}

export interface IEncounterFilterResponse {
  filters: IEncounterFilterProps[];
}

interface IAddendum {
  id: string;
  content: string;
  author: string;
  date: string;
  isEdited: boolean;
}

export interface IEncounterResponse {
  encounter: {
    id: string;
    content: string;
    updatedOn?: string;
    createdOn: string;
    title: string;
    author: string;
    addendums?: IAddendum[];
  };
}
export interface IUpdateEncounterAddendumRequest {
  id: string;
  content: string;
}
