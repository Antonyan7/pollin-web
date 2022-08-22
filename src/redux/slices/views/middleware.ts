import { AppDispatch } from 'redux/store';
import { RedirectionProps } from 'types/reduxTypes/views';

import slice from './slice';

const { setRedirection, setMenuActiveItem, setMenuOpenDrawer } = slice.actions;

const setRedirectionState = (value: RedirectionProps) => (dispatch: AppDispatch) => {
  dispatch(setRedirection(value));
};

const activateMenuItem = (value: string[]) => (dispatch: AppDispatch) => {
  dispatch(setMenuActiveItem(value));
};

const openMenuDrawer = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(setMenuOpenDrawer(value));
};

export default { setRedirectionState, activateMenuItem, openMenuDrawer };
