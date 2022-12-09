import { IEmptyResponse } from 'manager/common';
import { SortOrder } from 'types/patient';
import {
  ISpecimensListItemShort,
  ITestResultsDetails,
  TestResultMeasurementType
} from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

export enum TestResultsListSortFields {
  COLLECTION_AGE = 'CollectionAge',
  STATUS = 'Status',
  LAB = 'Lab',
  PATIENT_NAME = 'PatientName'
}

export enum TransportsSortFields {
  STATUS = 'ReadyForTransport'
}
export interface ITransportListReqBody {
  date: Date | string;
  page: number;
  specimens?: { identifier: string }[];
  sortOrder?: SortOrder;
  sortByField?: TransportsSortFields;
}

export enum SpecimensListSortFields {
  COLLECTION_AGE = 'CollectionAge'
}

export enum SpecimensInTransportListSortFields {
  PATIENT_NAME = 'PatientName'
}

export enum ActionType {
  Retest = 'Retest',
  Recollect = 'Recollect',
  InProgress = 'InProgress'
}

export enum TransportActionType {
  MarkInTransit = 'MarkInTransit',
  MoveToAnotherTransport = 'MoveToAnotherTransport',
  MoveToTransport = 'MoveToTransport'
}

export interface IResultsReqBody {
  page: number;
  searchString?: string;
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
  sortByField?: TestResultsListSortFields;
}

export interface IMarkInTransitActionReqBody {
  actionType: string;
  transportFolderId: string;
  driverName: string;
  comment?: string;
}

export interface IMakeTestResultReviewed {
  reviewDate: string;
}
export interface ISpecimensListReqBody {
  page: number;
  specimens?: ISpecimensListItemShort[];
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
  sortByField?: SpecimensListSortFields;
}

export interface IAllTestsSpecimensReqBody {
  page: number;
  specimens?: ISpecimensListItemShort[];
  sortOrder?: SortOrder;
  sortByField?: SpecimensListSortFields;
}

export interface IResultsReqBodyWithSortOrder extends IResultsReqBody {
  sortOrder: SortOrder;
}

export interface ITestResultsParams {
  testResultId?: string;
  specimenId?: string;
}

interface ITestResultAttachmentData {
  id?: string;
  title: string;
  note?: string;
  url?: string;
}

export interface ITestResultsData {
  id: string;
  comment: string;
  items: {
    id: string;
    resultType?: TestResultMeasurementType;
    dateReceived: string;
    result: string;
  };
  attachments?: ITestResultAttachmentData[];
}

export interface ITestResultsDetailsBody {
  testResults: ITestResultsDetails[];
}

export interface IAddMachineforSpecimen extends IEmptyResponse {}
export interface IAddSpecimenToTransportFolder extends IEmptyResponse {}
