import { SortOrder } from 'types/patient';

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
  filterId?: string;
  sortByField?: TestResultsListSortFields;
}

export interface IResultsReqBodyWithSortOrder extends IResultsReqBody {
  sortOrder: SortOrder;
}
