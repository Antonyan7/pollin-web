import { ISortOrder } from 'types/patient';
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

export interface ICreateTransportFolderReqBody {
  name: string;
  labId: string;
  date: string;
}

export interface IIdentifier {
  identifier: string;
}

export interface IGetTransportFoldersReqBody {
  date: string;
  specimens?: IIdentifier[];
  page: number;
  sortByField: TransportStatus;
  sortOrder: ISortOrder;
}

export interface ICreateTransportFolderResponse {
  uuid: string;
}

export interface ITransportFolderDriver {
  name: string;
}

export interface ITransportFolder {
  id: string;
  title: string;
  labName: string;
  driver: ITransportFolderDriver;
  status: TransportFolderStatus;
  age: number;
}

export interface IGetTransportFoldersResponse {
  folders: ITransportFolder[];
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

export enum TransportStatus {
  ReadyForTransport = 'ReadyForTransport',
  InTransit = 'InTransit'
}

export enum TransportFolderStatus {
  ReadyForTransport = 'Ready for transport',
  InTransit = 'In transit'
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
