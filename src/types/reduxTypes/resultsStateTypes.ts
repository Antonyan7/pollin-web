import { IPagination } from '@axios/axiosTypes';
import { IResultsFilterOption, TestResultsStats } from 'types/results';

export interface IResultsProps {
  resultsList: IResultsList;
  resultFilters: IResultsFilterCategory[];
  pendingTestStats: IPendingTestStats[];
  testResultDetails: TestResultsDetails | null;
  error: Error | null;
  labMachines: LabMachine[];
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
  isPendingTestStatsLoading: boolean;
  isTestResultDetailsLoading: boolean;
  islabMachinesLoading: boolean;
}

export interface LabMachine {
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
  title: string;
  patient: IResultListPatient;
}

export interface IResultsFilterCategory {
  type: string;
  title: string;
  options: IResultsFilterOption[];
}

export interface TestResultsDetails extends ITestResultsDetails {}
