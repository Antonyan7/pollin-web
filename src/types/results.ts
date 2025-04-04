import { OrderResultActionType } from '@axios/results/resultsManagerTypes';
import { ISortOrder } from 'types/patient';
import { ILab, ISpecimensFilterCategory, ITestResultsFilter } from 'types/reduxTypes/resultsStateTypes';

import { IOrderResultsFilterCategory } from './reduxTypes/ordersStateTypes';
import { SortOrder } from './patient';

export interface IResultsFiltersResponse {
  filters: ITestResultsFilter[];
}

export interface ISpecimensFiltersResponse {
  filters: ISpecimensFilterCategory[];
}

export interface IOrderResultsFiltersResponse {
  filters: IOrderResultsFilterCategory[];
}

export interface OrderResultAction {
  id: OrderResultActionType;
  title: string;
}

export interface IOrderResultsStatus {
  status: OrderResultStatusEnum;
  title: string;
  actions: OrderResultAction[];
  textColor: string;
  backgroundColor: string;
}
export interface IOrderResultsStatusesResponse {
  variations: IOrderResultsStatus[];
}
export interface ILabsResponse {
  labs: ILab[];
}

export interface ICreateTransportFolderReqBody {
  name: string;
  labId: string;
  date: Date | string;
}

export interface IGetSpecimensInTransportListParams {
  sortOrder?: SortOrder;
  sortByField?: string;
  page: number;
}
export interface IIdentifier {
  identifier: string;
}

export interface IGetTransportFoldersReqBody {
  date: string;
  specimens?: IIdentifier[];
  page: number;
  sortByField: TransportFolderStatus;
  sortOrder: ISortOrder;
}

export interface ICreateTransportFolderResponse {
  title: string;
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
  group: string;
  title: string;
}

export interface ISpecimensFilterOptions extends IResultsFilterOption {}
export interface IOrderResultsFilterOptions extends IResultsFilterOption {}

export enum OrderResultStatusEnum {
  Pending = 'Pending',
  NotReceived = 'NotReceived',
  Completed = 'Completed',
  Reported = 'Reported',
  Reviewed = 'Reviewed',
  Released = 'Released'
}

export enum TestResultsStats {
  GreaterThan30Days = 'GreaterThan30Days',
  GreaterThan15Days = 'GreaterThan15Days',
  LessThanOrEqual15Days = 'LessThanOrEqual15Days'
}

export enum TransportFolderStatus {
  ReadyForTransport = 'ReadyForTransport',
  InTransit = 'InTransit'
}

export enum ResultsErrorMessages {
  Specimen_not_found = 'SPECIMEN_NOT_FOUND'
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
  TestNotComplete = 'testNotComplete',
  Initial = 'initial'
}

export enum ContactInformationResultsPossibleResponses {
  Unknown = 'Unknown'
}
