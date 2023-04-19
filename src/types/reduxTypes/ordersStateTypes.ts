import { IPagination } from '@axios/axiosTypes';
import { IOrdersStatusesItems, IValidateOrderType } from '@axios/results/resultsManagerTypes';
import {
  CancellationReasons,
  IFinalResultType,
  IMeasurement,
  IResultsFilterCategory,
  TestType
} from 'types/reduxTypes/resultsStateTypes';
import { IOrderResultsStatus, OrderResultStatusEnum } from 'types/results';

export interface IOrdersState {
  orderTypeOptions: IOrderTypeOption[];
  selectedOrderType: string;
  orderTypes: IOrderTypesCollection[];
  editableOrderDetails: IOrderTypesCollection[];
  isOrderTypesLoading: boolean;
  orderDetails: IOrderDetailsData;
  isOrderDetailsLoading: boolean;
  cancellationReasons: CancellationReasons;
  isCancelOrderLoading: boolean;
  isCancellationReasonsLoading: boolean;
  isOrdersFiltersLoading: boolean;
  orderStatuses: IOrdersStatusesItems[];
  orderResultsFilters: IOrderResultsFilterCategory[];
  isOrderResultsFiltersLoading: boolean;
  orderResultsByPatientList: IOrderResultsByPatientList;
  isOrderResultsByPatientListLoading: boolean;
  shouldUpdateResultsList: boolean;
  orderResultsStatuses: IOrderResultsStatus[];
  ordersList: IOrdersList;
  isOrdersListLoading: boolean;
  isTestResultReviewed: boolean;
  isTestResultReleased: boolean;
  reviewDate: string;
  releaseDate: string;
  isRequisitionDownloaded: boolean;
}

export interface IOrderTypeOption {
  id: string;
  title: string;
}

export interface IOrderGroup {
  id: string;
  title: string;
  groupItems: IOrderGroupItem[];
}

export interface IOrderGroupItem {
  id: string;
  title: string;
  type: TestType;
  label?: string;
  selected?: boolean;
  groupItems?: IOrderGroupItem[];
}

export interface IOrderTypesCollection {
  id: string;
  title: string;
  groups: IOrderGroup[];
}

export interface IOrderTypesGroups {
  orderTypes: IOrderTypesCollection[];
}

export interface IOrderDetails {
  id: string;
  comment?: string;
  isEditable: boolean;
  hasRequisition: boolean;
  orderTypes: IOrderTypesCollection[];
}

export interface IOrderDetailsData {
  id: string;
  comment?: string;
  isEditable: boolean;
  cancellation?: {
    reason: string;
    date: string;
  };
  hasRequisition: boolean;
  orderTypes: IOrderTypesCollection[];
}
export interface IGetOrderDetailsResponse {
  order: IOrderDetails;
}

export interface IUpdateOrderReqBody {
  order: {
    comment?: string;
    orderTypes: IValidateOrderType[];
  };
}

export interface ICreateOrderReqBody {
  patientId: string;
  comment?: string;
  orderTypes: IValidateOrderType[];
}

export enum OrdersListItemStatus {
  NotCollected = 'NotCollected',
  Collecting = 'Collecting',
  AwaitingResults = 'AwaitingResults',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum OrdersActions {
  ViewAndEdit = 'ViewAndEdit',
  View = 'View',
  Download = 'Download',
  Cancel = 'Cancel'
}
export interface IOrderResultsByPatientItem {
  id: string;
  status: OrderResultStatusEnum;
  panelName: string;
  finalResultType: IFinalResultType;
  dateCompleted: string;
  measurement: IMeasurement[];
}
export interface IOrdersListItem {
  id: string;
  createdAt: Date;
  title: string;
  orderTypes: string;
  status: OrdersListItemStatus;
}

export interface IOrderResultsByPatientList extends IPagination {
  testResults: IOrderResultsByPatientItem[];
}

export interface IOrdersList extends IPagination {
  orders: IOrdersListItem[];
}

export interface IOrdersListResponse extends IOrdersList {}

export interface IOrderResultsFilterCategory extends IResultsFilterCategory {}

export interface ICancelOrderProps {
  patientId: string;
  orderId: string;
  reasonId: string;
  cancellationReason?: string;
}
