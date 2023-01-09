import API from '@axios/API';
import slice from '@redux/slices/orders/slice';
import store, { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import {
  IOrderDetailsData,
  IOrderGroup,
  IOrderGroupItem,
  IOrderGroupsCollection,
  UpdateOrderGroupItem
} from 'types/reduxTypes/ordersStateTypes';

const {
  setError,
  setOrderTypes,
  setSelectedOrderType,
  setIsOrderTypesLoading,
  setOrderGroups,
  setIsOrderGroupsLoading,
  setOrderDetails,
  setIsOrderDetailsLoading
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

export default {
  getOrderTypes,
  updateSelectedOrderType,
  getOrderGroups,
  updateOrderGroups,
  getOrderDetails,
  updateOrder
};
