import { IPagination } from '@axios/axiosTypes';
import { IResultsFilterOption, TestResultsStats } from 'types/results';

export interface IResultsProps {
  resultsList: IResultsList;
  resultFilters: IResultsFilterCategory[];
  pendingTestStats: IPendingTestStats[];
  error: Error | null;
  isResultsListLoading: boolean;
  isResultsFiltersLoading: boolean;
  isPendingTestStatsLoading: boolean;
}

export interface IResultsList extends IPagination {
  testResults: IExternalResultListData[];
}
export interface IPendingTestStats {
  title: string;
  type: TestResultsStats;
  count: number;
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
