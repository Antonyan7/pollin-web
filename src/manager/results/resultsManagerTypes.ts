import { IEmptyResponse } from 'manager/common';
import { ISortOrder, SortOrder } from 'types/patient';
import {
  IOrderGroup,
  IOrdersFilterItems,
  OrdersActions,
  OrdersListItemStatus
} from 'types/reduxTypes/ordersStateTypes';
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
  STATUS = 'Status',
  LAB_DESTINATION = 'LabDestination',
  DATE = 'Date'
}
export interface ITransportListReqBody {
  date: Date | string;
  page: number;
  specimens?: { identifier: string }[];
  sortOrder?: SortOrder;
  sortByField?: TransportsSortFields;
}

export enum SpecimensListSortFields {
  COLLECTION_AGE = 'CollectionAge',
  LAB_DESTINATION = 'LabDestination'
}

export enum OrderResultsSortFields {
  DATE = 'Date',
  NAME = 'Name',
  UNIT = 'Unit',
  RESULT = 'Result',
  STATUS = 'Status',
  FINAL_RESULT_TYPE = 'FinalResultType'
}

export enum SpecimensInTransportListSortFields {
  PATIENT_NAME = 'PatientName'
}

export enum SpecimenActionType {
  Retest = 'Retest',
  Recollect = 'Recollect',
  InProgress = 'InProgress',
  MoveToAnotherTransport = 'MoveToAnotherTransport',
  MoveToTransport = 'MoveToTransport',
  InputTestResults = 'InputTestResults',
  MoveToAllTests = 'Back',
  MoveInHouse = 'MoveInHouse'
}

export enum OrderResultActionType {
  Review = 'Review',
  Release = 'Release'
}

export enum TransportActionType {
  MarkInTransit = 'MarkInTransit'
}

export interface IResultsReqBody {
  page: number;
  searchString?: string;
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'title'>[];
  sortByField?: TestResultsListSortFields;
}

export interface IMarkInTransitActionReqBody {
  transportFolderId: string;
  driverName: string;
  comment?: string;
}

export interface IMakeTestResultReviewed {
  reviewDate: string;
}
export interface IMakeTestResultReleased {
  releaseDate: string;
}
export interface ISpecimensListReqBody {
  page: number;
  specimens?: ISpecimensListItemShort[];
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'group' | 'title'>[];
  sortByField?: SpecimensListSortFields;
}

export interface IOrderResultsListReqBody {
  page: number;
  sortOrder?: SortOrder;
  filters?: Omit<IResultsFilterOption, 'group' | 'title'>[];
  sortByField?: OrderResultsSortFields;
}

export interface ISpecimensReqBody {
  id: string;
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

export interface IAddMachineForSpecimen extends IEmptyResponse {}

export interface ISpecimenForAppointment {
  id: string;
  identifier: string;
  tests: {
    title: string;
  }[];
  vialColor: {
    code: string;
    title: string;
  };
}

export interface ISpecimensForAppointment {
  totalVialsCount: number;
  collectionDate: string;
  specimens: ISpecimenForAppointment[];
}

export interface ISpecimenLocation {
  id: string;
  title: string;
}

export interface ISpecimenLocations {
  locations: ISpecimenLocation[];
}

export interface ISpecimenCollection {
  specimenId: string;
  storageLocationId: ISpecimenLocation['id'];
}

export interface ISpecimenCollectionData {
  appointmentId: string;
  collections: ISpecimenCollection[];
}
export interface IAddSpecimenToTransportFolder extends IEmptyResponse {}

export interface IOrdersPossibleActions {
  id: OrdersActions;
  title: string;
}

export interface IOrdersStatusesItems {
  status: OrdersListItemStatus;
  title: string;
  possibleActions: IOrdersPossibleActions[];
  textColor: string;
  backgroundColor: string;
}

export enum OrdersFilterType {
  OrderType = 'OrderType',
  OrderNames = 'OrderNames'
}

export interface OrdersFilterOption {
  id: string;
  title: string;
}

export interface IOrdersFilters {
  filters: IOrdersFilterItems[];
}
export interface IOrdersStatuses {
  items: IOrdersStatusesItems[];
}
export interface OrderListDataFilter {
  id: string;
}

export enum OrderListSortFields {
  DateCreated = 'Date',
  Status = 'Status'
}
export interface OrdersListDataProps {
  page: number;
  filters?: OrderListDataFilter[];
  sortOrder: ISortOrder;
  sortByField: OrderListSortFields;
}

export interface IValidateOrderTypeGroupItem {
  id: string;
  groupItems?: IValidateOrderTypeGroupItem[];
}

export interface IValidateOrderType {
  id: string;
  groups: IValidateOrderTypeGroupItem[];
}

export interface IValidateOrderCreationReqBody {
  orderTypes: IValidateOrderType[];
}

export interface IValidatedOrderType {
  id: string;
  groups: IOrderGroup[];
}

export interface IValidateOrderCreationResponse {
  orderTypes: IValidatedOrderType[];
  message?: {
    title: string;
    html: string;
  };
}
