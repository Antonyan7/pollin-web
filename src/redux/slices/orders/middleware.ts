import API from '@axios/API';
import { IOrderResultsListReqBody, OrdersListDataProps } from '@axios/results/resultsManagerTypes';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/orders/slice';
import store, { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { ModalName } from 'types/modals';
import {
  IOrderDetailsData,
  IOrderGroup,
  IOrderGroupItem,
  IOrderGroupsCollection,
  IOrderResultsByPatientList,
  IOrdersListResponse,
  UpdateOrderGroupItem
} from 'types/reduxTypes/ordersStateTypes';

import { viewsMiddleware } from '../views';

const {
  setError,
  setOrderTypes,
  setSelectedOrderType,
  setIsOrderTypesLoading,
  setOrderGroups,
  setIsOrderGroupsLoading,
  setOrderDetails,
  setIsOrderDetailsLoading,
  setIsCancellationReasonsLoading,
  setIsCancelOrderLoading,
  setCancellationReasons,
  setIsOrderResultsByPatientListLoading,
  setIsOrdersFiltersLoadingState,
  setIsOrdersListLoading,
  setIsRequisitionDownloaded,
  setIsTestResultReleased,
  setIsTestResultReviewed,
  setOrderResultsByPatientList,
  setOrderResultsFilters,
  setOrderResultsFiltersLoadingState,
  setOrderResultsStatuses,
  setOrdersFilters,
  setOrdersList,
  setOrdersStatuses,
  setTestResultReleasedDate,
  setTestResultReviewedDate
} = slice.actions;

const getOrderTypes = () => async (dispatch: AppDispatch) => {
  dispatch(setIsOrderTypesLoading(true));

  try {
    const response = await API.results.getOrderTypes();

    dispatch(setOrderTypes(response.data.data.orderTypes));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsOrderTypesLoading(false));
  }
};

const updateSelectedOrderType = (orderType: string) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedOrderType(orderType));
};

const getOrderGroups = (orderType: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsOrderGroupsLoading(true));

  const { orderGroups } = store.getState().orders;
  const currentOrderGroupByType = orderGroups.find((group: IOrderGroupsCollection) => group.orderTypeId === orderType);

  try {
    if (!currentOrderGroupByType?.orderTypeId) {
      const response = await API.results.getOrderGroups(orderType);

      const orderGroupCollections = [
        ...store.getState().orders.orderGroups,
        {
          orderTypeId: orderType,
          groups: response.data.data.groups
        }
      ];

      dispatch(setOrderGroups(orderGroupCollections));
    }
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsOrderGroupsLoading(false));
  }
};

const updateOrderGroups =
  (orderTypeId: string, updatedOrderGroups: IOrderGroup[] = []) =>
  async (dispatch: AppDispatch) => {
    const { orderGroups } = store.getState().orders;

    const updatedOrderGroupsCollection: IOrderGroupsCollection[] = orderGroups.map(
      (collection: IOrderGroupsCollection) => {
        if (collection.orderTypeId === orderTypeId) {
          return {
            orderTypeId,
            groups: updatedOrderGroups
          };
        }

        return collection;
      }
    );

    dispatch(setOrderGroups(updatedOrderGroupsCollection));
  };

const getOrderDetails = (orderId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsOrderDetailsLoading(true));

    const { data } = await API.results.getOrderDetails(orderId);

    dispatch(setOrderDetails(data.order));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsOrderDetailsLoading(false));
  }
};

const updateOrder = (orderId: string, orderDetailsData: IOrderDetailsData) => async (dispatch: AppDispatch) => {
  try {
    const parseGroupItems = (orderGroupItems: IOrderGroupItem[]): UpdateOrderGroupItem[] =>
      orderGroupItems.map(({ id, groupItems }) =>
        groupItems === undefined ? { id } : { id, groupItems: parseGroupItems(groupItems) }
      );

    const body = {
      order: {
        ...(orderDetailsData.comment !== undefined ? { comment: orderDetailsData.comment } : {}),
        groups: (orderDetailsData.groups ?? []).map(({ id, groupItems }) => ({
          id,
          groupItems: parseGroupItems(groupItems)
        }))
      }
    };

    await API.results.updateOrder(orderId, body);
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getCancellationReasons = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCancellationReasonsLoading(true));

    const response = await API.results.getCancellationReasons();

    dispatch(setCancellationReasons(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsCancellationReasonsLoading(false));
  }
};

const cancelOrder =
  (orderId: string, reasonId: string, cancellationReason?: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsCancelOrderLoading(true));

    try {
      const response = await API.results.cancelOrder(orderId, reasonId, cancellationReason);

      if (response) {
        dispatch(viewsMiddleware.closeModal(ModalName.OrderCancellation));
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    }

    dispatch(setIsCancelOrderLoading(false));
  };

const makeTestResultReviewed = (testResultId: string, reviewerComment?: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsTestResultReviewed(true));

  try {
    const response = await API.results.makeTestResultReviewed(testResultId, reviewerComment);

    dispatch(setTestResultReviewedDate(response.data.data.reviewDate));
    dispatch(viewsMiddleware.closeModal(ModalName.TestResultReviewConfirmation));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsTestResultReviewed(false));
};

const makeTestResultReleased = (testResultId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsTestResultReleased(true));

  try {
    const response = await API.results.makeTestResultReleased(testResultId);

    dispatch(setTestResultReleasedDate(response.data.data.releaseDate));
    dispatch(viewsMiddleware.closeModal(ModalName.TestResultReviewConfirmation));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsTestResultReleased(false));
};

const getOrderResultsListForPatient =
  (data: IOrderResultsListReqBody, patientId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsOrderResultsByPatientListLoading(true));

      const body = (data.sortOrder !== null ? sortOrderTransformer(data) : data) as IOrderResultsListReqBody;

      const response = await API.results.getOrderResultsListForPatient(body, patientId);
      const {
        totalItems,
        currentPage,
        pageSize,
        data: { testResults }
      } = response.data;

      const results: IOrderResultsByPatientList = {
        totalItems,
        currentPage,
        pageSize,
        testResults
      };

      dispatch(setOrderResultsByPatientList(results));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    } finally {
      dispatch(setIsOrderResultsByPatientListLoading(false));
    }
  };

const downloadRequisition = (orderId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsRequisitionDownloaded(true));

  try {
    const response = await API.results.downloadRequisition(orderId);

    return response.data.data;
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsRequisitionDownloaded(false));

  return null;
};

const getOrdersFilters = () => async (dispatch: AppDispatch) => {
  dispatch(setIsOrdersFiltersLoadingState(true));

  try {
    const response = await API.results.getOrdersFilters();

    dispatch(setOrdersFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsOrdersFiltersLoadingState(false));
};

const getOrderStatuses = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getOrdersStatuses();

    dispatch(setOrdersStatuses(response.data.data.items));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};

const getOrderResultsFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setOrderResultsFiltersLoadingState(true));

    const response = await API.results.getOrderResultsFilters();

    dispatch(setOrderResultsFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setOrderResultsFiltersLoadingState(false));
  }
};

const getOrderResultsStatuses = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.results.getOrderResultsStatuses();

    dispatch(setOrderResultsStatuses(response.data.data.items));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }
};
const getOrdersList = (ordersListData: OrdersListDataProps) => async (dispatch: AppDispatch) => {
  dispatch(setIsOrdersListLoading(true));

  try {
    const response = await API.results.getOrdersList(ordersListData);
    const {
      totalItems,
      currentPage,
      pageSize,
      data: { orders }
    } = response.data;
    const listData: IOrdersListResponse = {
      totalItems,
      currentPage,
      pageSize,
      orders
    };

    dispatch(setOrdersList(listData));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsOrdersListLoading(false));
};

export default {
  getOrderTypes,
  updateSelectedOrderType,
  getOrderGroups,
  updateOrderGroups,
  getOrderDetails,
  updateOrder,
  getOrderResultsFilters,
  getOrderResultsListForPatient,
  getOrderResultsStatuses,
  getOrdersFilters,
  getOrdersList,
  getOrderStatuses,
  getCancellationReasons,
  downloadRequisition,
  cancelOrder,
  makeTestResultReleased,
  makeTestResultReviewed
};
