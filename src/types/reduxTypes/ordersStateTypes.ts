import { TestType } from 'types/reduxTypes/resultsStateTypes';

export interface IOrdersState {
  error: Error | null;
  orderTypes: IOrderType[];
  isOrderTypesLoading: boolean;
  selectedOrderType: string;
  orderGroups: IOrderGroupsCollection[];
  isOrderGroupsLoading: boolean;
  orderDetails: IOrderDetailsData;
  isOrderDetailsLoading: boolean;
}

export interface IOrderType {
  id: string;
  title: string;
}

export interface IOrderTypesList {
  orderTypes: IOrderType[];
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

export interface IOrderGroupsCollection {
  orderTypeId: string;
  groups: IOrderGroup[];
}

export interface IOrderGroupsList {
  groups: IOrderGroup[];
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
