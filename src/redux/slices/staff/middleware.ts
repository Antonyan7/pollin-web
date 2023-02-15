import API from '@axios/API';
import { IStaffRequestBody } from '@axios/staff/staffManagerTypes';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';

import slice from './slice';

const { setStaffUsers, updateStaffUsers, setIsStaffLoading } = slice.actions;

export const getStaffUsers = (filters: IStaffRequestBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsStaffLoading(true));

    const response = await API.staff.getStaffList(filters);

    const data = {
      staff: response.data.data.staff,
      pageSize: response.data.pageSize,
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage
    };

    dispatch(setStaffUsers(data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsStaffLoading(false));
  }
};

export const getNewStaffUsers = (filters: IStaffRequestBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsStaffLoading(true));

    const response = await API.staff.getStaffList(filters);

    const data = {
      staff: response.data.data.staff,
      pageSize: response.data.pageSize,
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage
    };

    dispatch(updateStaffUsers(data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsStaffLoading(false));
  }
};

export default { getStaffUsers, getNewStaffUsers };
