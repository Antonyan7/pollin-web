import { IOrdersStatusesItems } from '@axios/results/resultsManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  IOrderDetailsData,
  IOrderResultsByPatientList,
  IOrderResultsFilterCategory,
  IOrdersFilterItems,
  IOrdersList,
  IOrdersState,
  IOrderTypeOption,
  IOrderTypesCollection
} from 'types/reduxTypes/ordersStateTypes';
import { CancellationReasons } from 'types/reduxTypes/resultsStateTypes';
import { IOrderResultsStatus } from 'types/results';

const createReducer = <T extends SliceCaseReducers<IOrdersState>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
  setOrderTypeOptions(state, action: IAction<IOrderTypeOption[]>) {
    state.orderTypeOptions = action.payload;
  },
  setSelectedOrderType(state, action: IAction<string>) {
    state.selectedOrderType = action.payload;
  },
  setOrderTypes(state, action: IAction<IOrderTypesCollection[]>) {
    state.orderTypes = action.payload;
  },
  setIsOrderTypesLoading(state, action: IAction<boolean>) {
    state.isOrderTypesLoading = action.payload;
  },
  setOrderDetails(state, action: IAction<IOrderDetailsData>) {
    state.orderDetails = action.payload;
  },
  setIsOrderDetailsLoading(state, action: IAction<boolean>) {
    state.isOrderDetailsLoading = action.payload;
  },
  setOrdersStatuses(state, action: IAction<IOrdersStatusesItems[]>) {
    state.orderStatuses = action.payload;
  },
  setOrderResultsFilters(state, action: IAction<IOrderResultsFilterCategory[]>) {
    state.orderResultsFilters = action.payload;
  },
  setOrderResultsFiltersLoadingState(state, action: IAction<boolean>) {
    state.isOrderResultsFiltersLoading = action.payload;
  },
  setOrderResultsByPatientList(state, action: IAction<IOrderResultsByPatientList>) {
    state.orderResultsByPatientList = action.payload;
  },
  setIsOrderResultsByPatientListLoading(state, action: IAction<boolean>) {
    state.isOrderResultsByPatientListLoading = action.payload;
  },
  setIsOrdersFiltersLoadingState(state, action: IAction<boolean>) {
    state.isOrdersFiltersLoading = action.payload;
  },
  setIsRequisitionDownloaded(state, action: IAction<boolean>) {
    state.isRequisitionDownloaded = action.payload;
  },
  setOrdersFilters(state, action: IAction<IOrdersFilterItems[]>) {
    state.ordersFilters = action.payload;
  },
  setOrderResultsStatuses(state, action: IAction<IOrderResultsStatus[]>) {
    state.orderResultsStatuses = action.payload;
  },
  setOrdersList(state, action: IAction<IOrdersList>) {
    state.ordersList = action.payload;
  },
  setIsOrdersListLoading(state, action: IAction<boolean>) {
    state.isOrdersListLoading = action.payload;
  },
  setCancellationReasons(state, action: IAction<CancellationReasons>) {
    state.cancellationReasons = action.payload;
  },
  setIsCancelOrderLoading(state, action: IAction<boolean>) {
    state.isCancelOrderLoading = action.payload;
  },
  setIsCancellationReasonsLoading(state, action: IAction<boolean>) {
    state.isCancellationReasonsLoading = action.payload;
  },
  setTestResultReviewedDate(state, action: IAction<string>) {
    state.reviewDate = action.payload;
  },
  setIsTestResultReviewed(state, action: IAction<boolean>) {
    state.isTestResultReviewed = action.payload;
  },
  setIsTestResultReleased(state, action: IAction<boolean>) {
    state.isTestResultReleased = action.payload;
  },
  setTestResultReleasedDate(state, action: IAction<string>) {
    state.releaseDate = action.payload;
  }
});

export default reducers;
