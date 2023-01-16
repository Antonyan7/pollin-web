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
  isOrderDetailsLoading: false,
  cancellationReasons: {
    reasons: []
  },
  isCancelOrderLoading: false,
  isCancellationReasonsLoading: false,
  reviewDate: '',
  releaseDate: '',
  isTestResultReviewed: false,
  isTestResultReleased: false,
  orderStatuses: [],
  orderResultsFilters: [],
  isOrderResultsFiltersLoading: false,
  orderResultsByPatientList: {
    testResults: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isOrderResultsByPatientListLoading: false,
  ordersFilters: [],
  isRequisitionDownloaded: false,
  isOrdersFiltersLoading: false,
  orderResultsStatuses: [],
  ordersList: {
    orders: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  },
  isOrdersListLoading: false
});
