import { IPagination } from '@axios/axiosTypes';
import { LatestTestResultType } from '@axios/patientEmr/managerPatientEmrTypes';
import { IResultsFilterOption, TestResultsStats } from 'types/results';

export interface IResultsProps {
  resultsList: IResultsList;
  resultFilters: IResultsFilterCategory[];
  pendingTestStats: IPendingTestStats[];
  testResultDetails: TestResultsDetails | null;
  error: Error | null;
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
  isPendingTestStatsLoading: boolean;
  isTestResultDetailsLoading: boolean;
}

export interface IResultsList extends IPagination {
  testResults: IExternalResultListData[];
}
export interface IPendingTestStats {
  title: string;
  type: TestResultsStats;
  count: number;
}

enum TestResultMeasurementType {
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

interface ITestResultItem {
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
  finalResultType: LatestTestResultType;
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

export interface IExternalResultListData {
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
