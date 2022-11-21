import { IResultsFilterCategory, ISpecimensFilterCategory } from 'types/reduxTypes/resultsStateTypes';

export interface IResultsFiltersResponse {
  filters: IResultsFilterCategory[];
}

export interface ISpecimensFiltersResponse {
  filters: ISpecimensFilterCategory[];
}

export interface IResultsFilterOption {
  type: string;
  id: string;
  title: string;
}

export interface ISpecimensFilterOptions extends IResultsFilterOption {}

export enum TestResultsStats {
  GreaterThan30Days = 'GreaterThan30Days',
  GreaterThan15Days = 'GreaterThan15Days',
  LessThanOrEqual15Days = 'LessThanOrEqual15Days'
}

export enum TestResultsFilters {
  Status = 'Status',
  CollectionAge = 'CollectionAge',
  Lab = 'Lab',
  TestPanel = 'TestPanel',
  TestType = 'TestType'
}

export enum FinalResultChipColor {
  Normal = 'active',
  Abnormal = 'inActive',
  Initial = 'initial'
}
