import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { IStaffManager, IStaffProps } from 'types/reduxTypes/staff';

const createReducer = <T extends SliceCaseReducers<IStaffManager>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setStaffUsers(state, action: IAction<IStaffProps>) {
    state.staff = action.payload;
  },
  updateStaffUsers(state, action: IAction<IStaffProps>) {
    state.staff = { ...action.payload, staff: [...state.staff.staff, ...action.payload.staff] };
  },
  setIsStaffLoading(state, action: IAction<boolean>) {
    state.isStaffLoading = action.payload;
  }
});

export default reducers;
