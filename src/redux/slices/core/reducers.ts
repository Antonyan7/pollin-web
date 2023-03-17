import { SliceCaseReducers } from '@reduxjs/toolkit';
import { IAction } from 'redux/store';
import { CoreProps, IClinicConfig } from 'types/reduxTypes/coreStateTypes';

const createReducer = <T extends SliceCaseReducers<CoreProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setClinicConfig(state, action: IAction<IClinicConfig>) {
    state.clinicConfig = action.payload;
  },
  setFirebaseInitializationStatus(state, action: IAction<boolean>) {
    state.initializationStatus = {
      ...state.initializationStatus,
      firebase: action.payload
    };
  },
  setFeatureFlagsReadyStatus(state, action: IAction<boolean>) {
    state.initializationStatus = {
      ...state.initializationStatus,
      featureFlags: action.payload
    };
  }
});

export default reducers;
