import { AppDispatch } from 'redux/store';
import { IOpenedModal, RedirectionProps } from 'types/reduxTypes/views';

import { IOpenedAlert } from '../../../types/reduxTypes/views.d';

import slice from './slice';

const { setRedirection, setMenuActiveItem, setMenuOpenDrawer, updateModalState, updateToastNotificationState } =
  slice.actions;

const setRedirectionState = (value: RedirectionProps) => (dispatch: AppDispatch) => {
  dispatch(setRedirection(value));
};

const activateMenuItem = (value: string[]) => (dispatch: AppDispatch) => {
  dispatch(setMenuActiveItem(value));
};

const openMenuDrawer = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(setMenuOpenDrawer(value));
};

const setModalState =
  <P>(value: IOpenedModal<P>) =>
  (dispatch: AppDispatch) => {
    dispatch(updateModalState(value));
  };

const setToastNotificationPopUpState =
  <P>(value: IOpenedAlert<P>) =>
  (dispatch: AppDispatch) => {
    dispatch(updateToastNotificationState(value));
  };

export default { setRedirectionState, activateMenuItem, openMenuDrawer, setModalState, setToastNotificationPopUpState };
