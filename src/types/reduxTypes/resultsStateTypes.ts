import { IPagination } from '@axios/axiosTypes';
import { IResultsFilterOption, ITransportFolder, TestResultsStats } from 'types/results';

import { SchedulingStateStatusProps } from './schedulingStateTypes';

export interface ISpecimenProps {
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
  error: Error | null;
}

export enum IStatus {
  Pending = 'Pending',
  NotReceived = 'NotReceived',
  Completed = 'Completed',
  Reported = 'Reported'
}

export interface IResultsProps {
  resultsList: IResultsList;
  transportList: ITransportList;
  resultFilters: IResultsFilterCategory[];
  pendingTestStats: IPendingTestStats[];
  testResultsDetails: TestResultsDetails[];
  error: Error | null;
  labMachines: LabMachine;
  specimenActions: SpecimenActions[];
  transportActions: TransportActions[];
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
  isPendingTestStatsLoading: boolean;
  isTestResultsDetailsLoading: boolean;
  isLabMachinesLoading: boolean;
  isTestResultsSubmitLoading: boolean;
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
  specimensList: ISpecimensList;
  isSpecimensListLoading: boolean;
  specimensFilters: ISpecimensFilterCategory[];
  isSpecimensFiltersLoading: boolean;
  isTransportListLoading: boolean;
  allTestsSpecimensList: IAllTestsSpecimensList;
  isAllTestsSpecimensListLoading: boolean;
  reviewDate: string;
  labs: ILab[];
  isLabsLoading: boolean;
  isCreatingTransportFolder: boolean;
  specimensInTransportList: ISpecimensInTransportList;
  isSpecimensInTransportListLoading: boolean;
  transportFolders: ITransportFolder[];
  lastCreatedTransportFolderId: string | null;
  isTransportFoldersLoading: boolean;
  testResultStateStatus: SchedulingStateStatusProps;
}

export enum ITransportFolderStatus {
  ReadyForTransport = 'ReadyForTransport',
  InTransit = 'InTransit'
}

export interface ITransportListFolderProps {
  date: Date | string;
  id: string;
  title: string;
  labName: string;
  driver: { name: string };
  status: ITransportFolderStatus;
}
export interface ITransportListProps {
  folders: ITransportListFolderProps[];
}

export interface LabMachineProps {
  id: string;
  title: string;
}
export interface LabMachine {
  machines: LabMachineProps[];
}
export interface ILab {
  id: string;
  title: string;
}

export interface SpecimenActionsList {
  variations: SpecimenActions[];
}

export interface SpecimenActions {
  actions: SpecimenActionsValues[];
  status: string;
}
export interface TransportActions {
  actions: SpecimenActionsValues[];
  status: string;
}

export interface SpecimenActionsValues {
  id: string;
  title: string;
}

export interface IResultsList extends IPagination {
  testResults: IPatientContactInformationModalProps[];
}
export interface ITransportList extends IPagination {
  folders: ITransportListFolderProps[];
}
export interface ISpecimensListItem {
  id: string;
  identifier: string;
  titles: string[];
  machine: string;
  status: IStatus;
  age: number;
}

export interface IAllTestsSpecimensListItem {
  id: string;
  identifier: string;
  titles: string[];
  labName: string;
  status: IStatus;
  age: number;
}

export interface ISpecimensListItemShort {
  identifier: string;
}

export interface ISpecimensList extends IPagination {
  specimens: ISpecimensListItem[];
  notFound: ISpecimensListItemShort[];
}

export interface IAllTestsSpecimensList extends IPagination {
  specimens: IAllTestsSpecimensListItem[];
  notFound: ISpecimensListItemShort[];
}

export interface ISpecimensInTransportListItem {
  id: string;
  identifier: string;
  patientName: string;
  status: IStatus;
  age: number;
}

export interface ISpecimensInTransportList extends IPagination {
  specimens: ISpecimensInTransportListItem[];
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
export interface IRetestRecollectData {
  id: string;
}

export enum TestResultMeasurementType {
  Normal = 'Normal',
  Abnormal = 'Abnormal',
  Inconclusive = 'Inconclusive',
  Retest = 'Retest'
}

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
  // Case when we have local new attached file
  file?: File;
}

export interface ITestResultsDetails {
  id: string;
  isAttachmentRequired: boolean;
  title: string;
  comment?: string;
  dates: ITestResultDates;
  lab: ITestResultLab;
  items: ITestResultItem[];
  attachments: ITestResultAttachment[];
}

export interface IResultListPatient {
  id: string;
  name: string;
  dateOfBirth: string;
}

export interface IPatientContactInformationModalProps {
  id: string;
  age: number;
  labName: string;
  status: IStatus;
  title: string;
  patient: IResultListPatient;
  shouldBeRedirected?: boolean;
}

export interface IAddNewContactModalProps {
  transportId: string;
}

export interface IAddNewExistingTransportModalProps {
  specimenIds: string[];
}

export interface IResultsFilterCategory {
  type: string;
  title: string;
  options: IResultsFilterOption[];
}

export interface ISpecimensFilterCategory extends IResultsFilterCategory {}

export interface TestResultsDetails extends ITestResultsDetails {}
