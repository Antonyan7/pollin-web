import { IEmptyResponse } from 'manager/common';
import { SortOrder } from 'types/patient';
import { ITestResultsDetails, TestResultMeasurementType } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

export enum TestResultsListSortFields {
  COLLECTION_AGE = 'CollectionAge',
  STATUS = 'Status',
  LAB = 'Lab',
  PATIENT_NAME = 'PatientName'
}

export enum SpecimensListSortFields {
  COLLECTION_AGE = 'CollectionAge'
}

export interface IResultsReqBody {
  page: number;
  searchString?: string;
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
  sortByField?: TestResultsListSortFields;
}

export interface ISpecimensListReqBody {
  page: number;
  specimenIds?: string[];
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
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
  attachments: ITestResultAttachmentData[];
}
export interface ITestResultsDetailsBody {
  testResults: ITestResultsDetails[];
}

export interface IAddMachineforSpecimen extends IEmptyResponse {}
