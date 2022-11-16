import { IPagination } from '@axios/axiosTypes';
import { IResultsFilterOption, TestResultsStats } from 'types/results';

export interface ISpecimenProps {
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
  error: Error | null;
}

export interface IResultsProps {
  resultsList: IResultsList;
  resultFilters: IResultsFilterCategory[];
  pendingTestStats: IPendingTestStats[];
  testResultsDetails: TestResultsDetails[];
  error: Error | null;
  labMachines: LabMachine[];
  specimenActions: SpecimenActions[];
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
  isPendingTestStatsLoading: boolean;
  isTestResultsDetailsLoading: boolean;
  islabMachinesLoading: boolean;
  pendingSpecimenStats: IPendingTestStats[];
  isPendingSpecimenStatsLoading: boolean;
}

export interface LabMachine {
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

export interface SpecimenActionsValues {
  id: string;
  title: string;
}

export interface IResultsList extends IPagination {
  testResults: IPatientContactInformationModalProps[];
}
export interface IPendingTestStats {
  title: string;
  type: TestResultsStats;
  count: number;
}

export interface IPendingTestResultStats {
  testResultStats: IPendingTestStats[];
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

export interface ITestResultItem {
  id: string;
  type: string;
  unit: string;
  result: string;
  dateReceived: string;
  resultType?: TestResultMeasurementType;
}

interface ITestResultAttachment {
  id: string;
  title: string;
  note?: string;
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

export enum IResultListPatientStatus {
  Pending = 'Pending',
  NotReceived = 'NotReceived',
  Completed = 'Completed',
  Reported = 'Reported'
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
  status: IResultListPatientStatus;
  title: string;
  patient: IResultListPatient;
}

export interface IResultsFilterCategory {
  type: string;
  title: string;
  options: IResultsFilterOption[];
}

export interface TestResultsDetails extends ITestResultsDetails {}
