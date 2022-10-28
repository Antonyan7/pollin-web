import { dispatch } from '@redux/hooks';
import { userMiddleware } from '@redux/slices/user';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';

export const dispatchIsAuthChecked = (status: boolean) => {
  dispatch(userMiddleware.onAuthCheck(status));
};

export const dispatchLoginUser = (user: User | null) => {
  dispatch(userMiddleware.onLogin(user));
};

export const dispatchLogoutUser = () => {
  dispatch(userMiddleware.onLogout());
};

export const dispatchAuthError = (error: FirebaseError) => {
  dispatch(userMiddleware.onError(error));
};
