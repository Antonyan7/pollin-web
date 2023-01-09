import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { IOrderDetailsData, IOrderGroupsCollection, IOrdersState, IOrderType } from 'types/reduxTypes/ordersStateTypes';

const createReducer = <T extends SliceCaseReducers<IOrdersState>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
  setOrderTypes(state, action: IAction<IOrderType[]>) {
    state.orderTypes = action.payload;
  },
  setIsOrderTypesLoading(state, action: IAction<boolean>) {
    state.isOrderTypesLoading = action.payload;
  },
  setSelectedOrderType(state, action: IAction<string>) {
    state.selectedOrderType = action.payload;
  },
  setOrderGroups(state, action: IAction<IOrderGroupsCollection[]>) {
    state.orderGroups = action.payload;
  },
  setIsOrderGroupsLoading(state, action: IAction<boolean>) {
    state.isOrderGroupsLoading = action.payload;
  },
  setOrderDetails(state, action: IAction<IOrderDetailsData>) {
    state.orderDetails = action.payload;
  },
  setIsOrderDetailsLoading(state, action: IAction<boolean>) {
    state.isOrderDetailsLoading = action.payload;
  }
});

export default reducers;
