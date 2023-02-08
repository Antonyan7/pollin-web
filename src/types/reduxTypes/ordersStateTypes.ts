import { IPagination } from '@axios/axiosTypes';
import { IOrdersStatusesItems, OrdersFilterOption, OrdersFilterType } from '@axios/results/resultsManagerTypes';
import {
  CancellationReasons,
  IFinalResultType,
  IMeasurement,
  IResultsFilterCategory,
  TestType
} from 'types/reduxTypes/resultsStateTypes';
import { IOrderResultsStatus, OrderResultStatusEnum } from 'types/results';

export interface IOrdersState {
  error: Error | null;
  orderTypeOptions: IOrderTypeOption[];
  selectedOrderType: string;
  orderTypes: IOrderTypesCollection[];
  isOrderTypesLoading: boolean;
  orderDetails: IOrderDetailsData;
  isOrderDetailsLoading: boolean;
  cancellationReasons: CancellationReasons;
  isCancelOrderLoading: boolean;
  isCancellationReasonsLoading: boolean;
  ordersFilters: IOrdersFilterItems[];
  isOrdersFiltersLoading: boolean;
  orderStatuses: IOrdersStatusesItems[];
  orderResultsFilters: IOrderResultsFilterCategory[];
  isOrderResultsFiltersLoading: boolean;
  orderResultsByPatientList: IOrderResultsByPatientList;
  isOrderResultsByPatientListLoading: boolean;
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
  groups: IOrderGroup[];
}

export interface IOrderDetailsData {
  id: string;
  comment?: string;
  isEditable: boolean;
  hasRequisition: boolean;
  groups: IOrderGroup[] | null;
}
export interface IGetOrderDetailsResponse {
  order: IOrderDetails;
}

export interface UpdateOrderGroupItem {
  id: string;
  groupItems?: UpdateOrderGroupItem[];
}

export interface UpdateOrderGroup {
  id: string;
  groupItems: UpdateOrderGroupItem[];
}

export interface UpdateOrderData {
  comment?: string;
  groups: UpdateOrderGroup[];
}

export interface IUpdateOrderReqBody {
  order: UpdateOrderData;
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
  dateReported: string;
  measurement: IMeasurement[];
}

export interface IOrdersFilterItems {
  title: string;
  type: OrdersFilterType;
  options: OrdersFilterOption[];
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
