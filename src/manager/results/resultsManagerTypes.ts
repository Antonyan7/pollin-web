import { SortOrder } from 'types/patient';
import { ITestResultsDetails } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

export enum TestResultsListSortFields {
  COLLECTION_AGE = 'Collection Age',
  STATUS = 'Status',
  LAB = 'Lab',
  PATIENT_NAME = 'Patient Name'
}

export interface IResultsReqBody {
  page: number;
  searchString?: string;
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
  sortByField?: TestResultsListSortFields;
}

export interface IResultsReqBodyWithSortOrder extends IResultsReqBody {
  sortOrder: SortOrder;
}

export interface ITestResultsParams {
  testResultId?: string;
  specimenId?: string;
}

export interface ITestResultsDetailsBody {
  testResults: ITestResultsDetails[];
}
