import { ILab, IResultsFilterCategory, ISpecimensFilterCategory } from 'types/reduxTypes/resultsStateTypes';

export interface IResultsFiltersResponse {
  filters: IResultsFilterCategory[];
}

export interface ISpecimensFiltersResponse {
  filters: ISpecimensFilterCategory[];
}

export interface ILabsResponse {
  labs: ILab[];
}

export interface IGroupedLabOptions extends ILab {}

export interface ICreateTransportFolderReqBody {
  name: string;
  labId: string;
  date: string;
}

export interface ICreateTransportFolderResponse {
  uuid: string;
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

export enum TestResultsStatsNumbers {
  Days30 = 30,
  Days15 = 15
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
