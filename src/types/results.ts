import { IResultsFilterCategory } from 'types/reduxTypes/resultsStateTypes';

export interface IResultsFiltersResponse {
  filters: IResultsFilterCategory[];
}

export interface IResultsFilterOption {
  type: string;
  id: string;
  title: string;
}

export enum TestResultsStats {
  GreaterThan30Days = 'GreaterThan30Days',
  GreaterThan15Days = 'GreaterThan15Days',
  LessThanOrEqual15Days = 'LessThanOrEqual15Days'
}
