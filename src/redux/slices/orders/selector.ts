import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.orders;

const orderTypes = createSelector([selector], (state) => state.orderTypes);
const isOrderTypesLoading = createSelector([selector], (state) => state.isOrderTypesLoading);
const selectedOrderType = createSelector([selector], (state) => state.selectedOrderType);
const orderGroups = createSelector([selector], (state) => state.orderGroups);
const isOrderGroupsLoading = createSelector([selector], (state) => state.isOrderGroupsLoading);
const orderDetails = createSelector([selector], (state) => state.orderDetails);
const isOrderDetailsLoading = createSelector([selector], (state) => state.isOrderDetailsLoading);

export default {
  orderTypes,
  isOrderTypesLoading,
  selectedOrderType,
  orderGroups,
  isOrderGroupsLoading,
  orderDetails,
  isOrderDetailsLoading
};
