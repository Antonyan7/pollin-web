import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';

import slice from './slice';

const { setAuthCheckStatus, setUser, setIsUserDisabled, setAuthError } = slice.actions;

export const onAuthCheck = (status: boolean) => (dispatch: AppDispatch) => {
  dispatch(setAuthCheckStatus(status));
};

export const onLogin = (user: User | null) => (dispatch: AppDispatch) => {
  dispatch(setUser(user));
};

export const onLogout = () => (dispatch: AppDispatch) => {
  dispatch(setUser(null));
};

export const onDisabledUser = (status: boolean) => (dispatch: AppDispatch) => {
  dispatch(setIsUserDisabled(status));
};

export const onError = (error: FirebaseError | null) => (dispatch: AppDispatch) => {
  dispatch(setAuthError(error));
  Sentry.captureException(error);
};

export default { onAuthCheck, onDisabledUser, onLogin, onLogout, onError };
