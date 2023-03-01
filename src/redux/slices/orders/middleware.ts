import API from '@axios/API';
import {
  IOrderResultsListReqBody,
  IValidateOrderCreationReqBody,
  IValidateOrderType,
  OrderListSortFields,
  OrdersListDataProps
} from '@axios/results/resultsManagerTypes';
import { SeveritiesType } from '@components/Scheduling/types';
import { sortOrderTransformer } from '@redux/data-transformers/sortOrderTransformer';
import slice from '@redux/slices/orders/slice';
import store, { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { t } from 'i18next';
import { ModalName } from 'types/modals';
import { ISortOrder, SortOrder } from 'types/patient';
import {
  ICancelOrderProps,
  ICreateOrderReqBody,
  IOrderDetailsData,
  IOrderGroup,
  IOrderResultsByPatientList,
  IOrdersListResponse,
  IOrderTypesCollection,
  IUpdateOrderReqBody
} from 'types/reduxTypes/ordersStateTypes';

import { collectionDeepMerge } from '@utils/collectionDeepMerge';
import { capitalizeFirst } from '@utils/stringUtils';

import { Translation } from '../../../constants/translations';
import { viewsMiddleware } from '../views';

const {
  setError,
  setSelectedOrderType,
  setOrderTypes,
  setIsOrderTypesLoading,
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
  setOrderTypeOptions,
  setTestResultReleasedDate,
  setTestResultReviewedDate,
  setEditableOrderDetails
} = slice.actions;

const updateSelectedOrderType = (orderType: string) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedOrderType(orderType));
};

const prepareEditableOrderDetails =
  (orderTypes: IOrderTypesCollection[], orderDetails: IOrderDetailsData) => async (dispatch: AppDispatch) => {
    if (orderDetails.orderTypes.length > 0 && orderTypes.length > 0) {
      const editableOrderDetails = collectionDeepMerge(orderTypes, orderDetails.orderTypes, 'id');

      dispatch(setEditableOrderDetails(editableOrderDetails));
    } else {
      dispatch(setEditableOrderDetails(orderTypes));
    }
  };

const mergeEditableOrderDetailsWithOrderDetails =
  (editableOrderDetails: IOrderTypesCollection[], orderDetails: IOrderDetailsData) => async (dispatch: AppDispatch) => {
    if (orderDetails.orderTypes.length > 0) {
      const updatedEditableOrders = collectionDeepMerge(editableOrderDetails, orderDetails.orderTypes, 'id');

      dispatch(setEditableOrderDetails(updatedEditableOrders));
      dispatch(
        setOrderDetails({ ...orderDetails, orderTypes: updatedEditableOrders as IOrderDetailsData['orderTypes'] })
      );
    }
  };

const getOrderTypes = () => async (dispatch: AppDispatch) => {
  dispatch(setIsOrderTypesLoading(true));

  try {
    const response = await API.results.getOrderTypes();
    const orderTypeOptions = response.data.data.orderTypes.map((orderType: IOrderTypesCollection) => ({
      id: orderType.id,
      title: orderType.title
    }));

    dispatch(setOrderTypes(response.data.data.orderTypes));
    dispatch(setOrderTypeOptions(orderTypeOptions));
    dispatch(prepareEditableOrderDetails(response.data.data.orderTypes, store.getState().orders.orderDetails));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsOrderTypesLoading(false));
  }
};

const updateEditableOrderTypes =
  (id: string, updatedOrderGroups: IOrderGroup[] = []) =>
  async (dispatch: AppDispatch) => {
    const { editableOrderDetails } = store.getState().orders;

    const updatedEditableOrderDetails: IOrderTypesCollection[] = editableOrderDetails.map(
      (collection: IOrderTypesCollection) => {
        if (collection.id === id) {
          return {
            id: collection.id,
            title: collection.title,
            groups: updatedOrderGroups
          };
        }

        return collection;
      }
    );

    dispatch(setEditableOrderDetails(updatedEditableOrderDetails));
  };

const resetOrderTypesSelection = () => async (dispatch: AppDispatch) => {
  dispatch(setSelectedOrderType(''));
  dispatch(setOrderTypes([]));
  dispatch(setEditableOrderDetails([]));
  dispatch(
    setOrderDetails({
      id: '',
      isEditable: false,
      hasRequisition: false,
      orderTypes: []
    })
  );
};

const getOrderDetails = (orderId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsOrderDetailsLoading(true));

    const { editableOrderDetails } = store.getState().orders;

    const { data } = await API.results.getOrderDetails(orderId);

    dispatch(mergeEditableOrderDetailsWithOrderDetails(editableOrderDetails, data.order));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  } finally {
    dispatch(setIsOrderDetailsLoading(false));
  }
};

const createOrder =
  (patientId: string, orderTypes: IValidateOrderType[], comment?: string) => async (dispatch: AppDispatch) => {
    try {
      const body: ICreateOrderReqBody = {
        patientId,
        ...(comment ? { comment } : {}),
        orderTypes
      };

      await API.results.createOrder(body);

      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_CREATE_ORDER_SUCCESS_MESSAGE)
          }
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setError(error));
    }
  };

const updateOrder =
  (orderId: string, orderTypes: IValidateOrderType[], comment?: string) => async (dispatch: AppDispatch) => {
    try {
      const body: IUpdateOrderReqBody = {
        order: {
          ...(comment ? { comment } : {}),
          orderTypes
        }
      };

      await API.results.updateOrder(orderId, body);

      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_ORDER_DETAILS_UPDATE_SUCCESS_MESSAGE)
          }
        })
      );
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

    dispatch(setOrdersStatuses(response.data.data.variations));
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

const validateOrderCreation = (orderTypes: IValidateOrderCreationReqBody) => async (dispatch: AppDispatch) => {
  dispatch(setIsOrdersListLoading(true));

  const { editableOrderDetails } = store.getState().orders;
  const { orderDetails } = store.getState().orders;
  const { orderTypes: defaultOrderTypes } = store.getState().orders;

  try {
    const { data } = await API.results.validateOrderCreation(orderTypes);

    if (data?.message) {
      const { title, html } = data.message;

      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.OrderValidationErrorModal,
          props: {
            title,
            html
          }
        })
      );

      dispatch(
        mergeEditableOrderDetailsWithOrderDetails(defaultOrderTypes, {
          ...orderDetails,
          orderTypes: data.orderTypes as IOrderDetailsData['orderTypes']
        })
      );
    } else {
      dispatch(
        mergeEditableOrderDetailsWithOrderDetails(editableOrderDetails, {
          ...orderDetails,
          orderTypes: data.orderTypes as IOrderDetailsData['orderTypes']
        })
      );
    }
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsOrdersListLoading(false));
};

const updateDetailsComment = (comment: string) => async (dispatch: AppDispatch) => {
  const { orderDetails } = store.getState().orders;

  dispatch(setOrderDetails({ ...orderDetails, comment }));
};

const cancelOrder = (cancellationProps: ICancelOrderProps) => async (dispatch: AppDispatch) => {
  dispatch(setIsCancelOrderLoading(true));

  const { orderId, patientId, reasonId, cancellationReason } = cancellationProps;

  try {
    const response = await API.results.cancelOrder(orderId, reasonId, cancellationReason);

    const capitalizedSortOrder = capitalizeFirst<ISortOrder>(SortOrder.Asc);
    const capitalizedSortField = capitalizeFirst<OrderListSortFields>(OrderListSortFields.Status);
    const data: OrdersListDataProps = {
      sortByField: capitalizedSortField,
      patientId,
      sortOrder: capitalizedSortOrder,
      page: 1
    };

    if (response) {
      dispatch(getOrdersList(data));
      dispatch(viewsMiddleware.closeModal(ModalName.OrderCancellation));
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.MODAL_CONFIRM_ORDER_CANCELLATION_SUCCESS_ALERT)
          }
        })
      );
    }
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setError(error));
  }

  dispatch(setIsCancelOrderLoading(false));
};

export default {
  updateSelectedOrderType,
  getOrderTypes,
  updateEditableOrderTypes,
  resetOrderTypesSelection,
  getOrderDetails,
  updateOrder,
  createOrder,
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
  makeTestResultReviewed,
  validateOrderCreation,
  updateDetailsComment
};
