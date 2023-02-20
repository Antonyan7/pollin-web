import { IPagination } from '@axios/axiosTypes';
import { ISpecimenLocation, ISpecimensForAppointment } from '@axios/results/resultsManagerTypes';
import { ModalName } from 'types/modals';
import {
  IResultsFilterOption,
  ITransportFolder,
  ITransportFolderDriver,
  TestResultsStats,
  TransportFolderStatus
} from 'types/results';

import { SchedulingStateStatusProps } from './schedulingStateTypes';

export interface ISpecimenProps {
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
  error: Error | null;
}

export enum ITestResultStatus {
  Pending = 'Pending',
  NotReceived = 'NotReceived',
  Completed = 'Completed',
  Reported = 'Reported',
  Reviewed = 'Reviewed',
  Released = 'Released'
}

export enum IFinalResultType {
  Normal = 'Normal',
  Abnormal = 'Abnormal'
}

export interface ITestResultsCommonProps {
  testResultsDetails: TestResultsDetails[];
  isTestResultsDetailsLoading: boolean;
  isTestResultsSubmitLoading: boolean;
  error: Error | null;
  isTestResultsSubmitWentSuccessful: boolean | null;
  specimenActions: SpecimenActions[];
  allTestsSpecimensList: IAllTestsSpecimensList;
  isAllTestsSpecimensListLoading: boolean;
}

export interface IInHouseTestResultsProps {
  specimensList: ISpecimensList;
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
  isSpecimensListLoading: boolean;
  isSpecimensConfirmationButtonClicked: boolean;
  specimensFilters: ISpecimensFilterCategory[];
  isSpecimensFiltersLoading: boolean;
}

export interface IExternalTestResults {
  resultsList: IResultsList;
  pendingTestStats: IPendingTestStats[];
  isPendingTestStatsLoading: boolean;
  resultFilters: ITestResultsFilter[];
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
}

export interface ITestResultsTracking {
  transportList: ITransportList;
  specimensInTransportList: ISpecimensInTransportList;
  shouldRefetchInTransportList: boolean;
  isTransportFolderDownloaded: boolean;
  transportActions: TransportActions[];
  labs: ILab[];
  isLabsLoading: boolean;
  labMachines: LabMachine;
  isLabMachinesLoading: boolean;
  isSpecimenAddedToFolder: boolean;
  isTransportListLoading: boolean;
  isCreatingTransportFolder: boolean;
  transportFolders: ITransportFolder[];
  lastCreatedTransportFolder: LastCreatedTransportFolder | null;
  isTransportFoldersLoading: boolean;
  testResultStateStatus: SchedulingStateStatusProps;
}

export interface ITestResultsCollection {
  appointmentSpecimens: ISpecimensForAppointment | null;
  isAppointmentSpecimensLoading: boolean;
  isSendingSpecimenCollectionData: boolean;
  specimenStorageLocations: ISpecimenLocation[];
  isSpecimenStorageLocationsLoading: boolean;
  isSpecimensInTransportListLoading: boolean;
  isUpdatingSpecimenCollectionAppointmentStatus: boolean;
}

export interface ITestResultProps {
  common: ITestResultsCommonProps;
  inHouse: IInHouseTestResultsProps;
  external: IExternalTestResults;
  tracking: ITestResultsTracking;
  collection: ITestResultsCollection;
}

export interface CancellationReasonsProps {
  id: string;
  title: string;
}
export interface CancellationReasons {
  reasons: CancellationReasonsProps[];
}
export interface IMakeTestResultReviewReq {
  testResultId: string;
  reviewerComment?: string;
}
export interface ITransportListFolderProps {
  date: string;
  id: string;
  identifier?: string;
  title: string;
  labName: string;
  fullTitle: string;
  driver: ITransportFolderDriver;
  status: TransportFolderStatus;
}
export interface ITransportListProps {
  folders: ITransportListFolderProps[];
  notFound: ISpecimensListItemShort[];
}

export interface LabMachineProps {
  id: string;
  title: string;
}
export interface LabMachine {
  machines: LabMachineProps[];
  reasons?: CancellationReasonsProps[];
}
export interface ILab {
  id: string;
  title: string;
}

export interface LastCreatedTransportFolder extends LabMachineProps {}

export interface SpecimenActionsList {
  variations: SpecimenActions[];
}

export interface SpecimenActions {
  actions: ContextMenuAction[];
  title: string;
  status: SpecimenActionsType;
}
export interface TransportActions {
  actions: ContextMenuAction[];
  title: string;
  status: string;
}

export interface ContextMenuAction {
  id: string;
  title: string;
}

export enum SpecimenActionsType {
  NotCollected = 'Not Collected',
  Collected = 'Collected',
  ReceivedInLab = 'Received In Lab',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  ReadyForTransport = 'Ready For Transport',
  InTransit = 'In Transit',
  RetestRequired = 'Retest Required',
  RecollectRequired = 'Recollect Required'
}

export interface IResultsList extends IPagination {
  testResults: IPatientContactInformationModalProps[];
}
export interface ITransportList extends IPagination {
  folders: ITransportListFolderProps[];
  notFound: ISpecimensListItemShort[];
}
export interface ISpecimensListItem {
  id: string;
  identifier: string;
  titles: string[];
  machine: string;
  status: SpecimenActionsType;
  age: number;
}

export interface IMeasurement {
  title: string;
  unit: string;
  result: string;
}

export interface IAllTestsSpecimensListItem {
  id: string;
  identifier: string;
  titles: string[];
  labName: string;
  status: SpecimenActionsType;
  age: number;
}

export interface ISpecimensList extends IPagination {
  specimens: ISpecimensListItem[];
  notFound: ISpecimensListItemShort[];
}

export interface IAllTestsSpecimensList extends IPagination {
  specimens: IAllTestsSpecimensListItem[];
  notFound: ISpecimensListItemShort[];
}

export interface ISpecimensListItemShort {
  identifier: string;
}

export interface ISpecimensInTransportListItem {
  id: string;
  identifier: string;
  patientName: string;
  status: SpecimenActionsType;
  age: number;
}

export interface ISpecimensInTransportList extends IPagination {
  specimens: ISpecimensInTransportListItem[];
  transportFolder: {
    title: string;
  };
}

export interface IPendingTestStats {
  title: string;
  type: TestResultsStats;
  count: number;
}

export interface IPendingTestResultStats {
  testResultStats: IPendingTestStats[];
}

export interface IPendingSpecimensStats {
  stats: IPendingTestStats[];
}
export interface IObjectWithId {
  id: string;
}

export enum TestResultMeasurementType {
  Normal = 'Normal',
  Abnormal = 'Abnormal',
  Inconclusive = 'Inconclusive',
  Retest = 'Retest'
}

// TODO: refactor this
export type TableRowCheckboxProps =
  | IAllTestsSpecimensListItem
  | ISpecimensListItem
  | ITransportListFolderProps
  | ISpecimensInTransportListItem;

interface ITestResultDates {
  collected: string;
  ordered: string;
}

interface ITestResultLab {
  location: string;
  phone: string;
  doctorName: string;
}

export interface IPossibleResultOptions {
  title: string;
}

export interface ITestResultItem {
  id: string;
  type: string;
  unit: string;
  result: string;
  dateReceived: string;
  resultType?: TestResultMeasurementType;
  possibleResultOptions?: IPossibleResultOptions[];
}

export interface ITestResultAttachment {
  id: string;
  title: string;
  note?: string;
  // Case when we have new attached file
  file?: File;
}

export interface ITestResultDetailsReport {
  comment: string;
  reviewDate: string;
  releaseDate: string;
}

export interface ITestResultsDetails {
  id: string;
  isAttachmentRequired: boolean;
  status: ITestResultStatus;
  title: string;
  finalResultType: IFinalResultType;
  comment?: string;
  dates: ITestResultDates;
  lab: ITestResultLab;
  items: ITestResultItem[];
  attachments: ITestResultAttachment[];
  report?: ITestResultDetailsReport;
}

export interface IResultListPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  identifier: string;
}

export interface IPatientContactInformationModalProps {
  id: string;
  age: number;
  labName: string;
  status: SpecimenActionsType;
  title: string;
  patient: IResultListPatient;
  shouldBeRedirected?: boolean;
}

export interface IAddNewContactModalProps {
  transportId: string;
}

export interface IAddNewExistingTransportModalProps {
  specimenIds: string[];
  selectedIdentifiers: string[];
  modalName: ModalName;
}

export interface IResultsFilterCategory {
  title: string;
  options: IResultsFilterOption[];
}

export interface ITestResultsFilter extends IResultsFilterCategory {}

export interface ISpecimensFilterCategory extends IResultsFilterCategory {}

export interface TestResultsDetails extends ITestResultsDetails {}

export enum TestType {
  OrderGroup = 'OrderGroup',
  TestPanel = 'Panel',
  TestType = 'TestType'
}
