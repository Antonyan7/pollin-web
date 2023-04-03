import { IOrdersState } from 'types/reduxTypes/ordersStateTypes';

export const getInitialState = (): IOrdersState => ({
  orderTypeOptions: [],
  selectedOrderType: '',
  orderTypes: [],
  isOrderTypesLoading: false,
  orderDetails: {
    id: '',
    comment: '',
    isEditable: false,
    hasRequisition: false,
    orderTypes: []
  },
  editableOrderDetails: [],
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
    pageSize: 25,
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
    pageSize: 25,
    totalItems: 0
  },
  isOrdersListLoading: false
});
