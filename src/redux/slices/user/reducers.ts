import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { FirebaseError } from 'firebase/app';
import { IAction } from 'redux/store';
import { IUser, UserProps } from 'types/reduxTypes/user';

const createReducer = <T extends SliceCaseReducers<UserProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setAuthCheckStatus(state, action: IAction<boolean>) {
    state.isAuthChecked = action.payload;
  },
  setUser(state, action: IAction<IUser | null>) {
    state.user = action.payload;
  },
  setAuthError(state, action: IAction<FirebaseError | null>) {
    state.authError = action.payload;
  }
});

export default reducers;
