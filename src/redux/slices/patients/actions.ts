import { IAction, SliceReducers } from 'redux/store';

import { IPatientList, IPatientsProps } from '../../../types/reduxTypes/patients';

const actions: SliceReducers<IPatientsProps> = {
  setError(state, action) {
    state.error = action.payload;
  },
  setPatientsList(state, action: IAction<IPatientList>) {
    state.patientsList = action.payload;
  }
};

export default actions;
