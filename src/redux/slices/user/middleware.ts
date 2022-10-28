import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/nextjs';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';

import slice from './slice';

const { setAuthCheckStatus, setUser, setAuthError } = slice.actions;

export const onAuthCheck = (status: boolean) => (dispatch: AppDispatch) => {
  dispatch(setAuthCheckStatus(status));
};

export const onLogin = (user: User | null) => (dispatch: AppDispatch) => {
  dispatch(setUser(user));
};

export const onLogout = () => (dispatch: AppDispatch) => {
  dispatch(setUser(null));
};

export const onError = (error: FirebaseError | null) => (dispatch: AppDispatch) => {
  dispatch(setAuthError(error));
  Sentry.captureException(error);
};

export default { onAuthCheck, onLogin, onLogout, onError };
