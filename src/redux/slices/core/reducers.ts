import { IClinicConfigResponse } from '@axios/core/coreManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit';
import { IAction } from 'redux/store';

interface IClinicConfigProps extends IClinicConfigResponse {}

interface CoreProps {
  clinicConfig: IClinicConfigProps;
}

const createReducer = <T extends SliceCaseReducers<CoreProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setClinicConfig(state, action: IAction<IClinicConfigProps>) {
    state.clinicConfig = action.payload;
  }
});

export default reducers;
