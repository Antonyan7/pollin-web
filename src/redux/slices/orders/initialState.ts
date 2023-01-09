import { IOrdersState } from 'types/reduxTypes/ordersStateTypes';

export const getInitialState = (): IOrdersState => ({
  error: null,
  orderTypes: [],
  isOrderTypesLoading: false,
  selectedOrderType: '',
  orderGroups: [],
  isOrderGroupsLoading: false,
  orderDetails: {
    id: '',
    isEditable: false,
    hasRequisition: false,
    groups: null
  },
  isOrderDetailsLoading: false
});
