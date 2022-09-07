import { AlertDetailsProps, IPatientList, IPatientsProps } from 'manager/managerPatient.d';
import { IAction, SliceReducers } from 'redux/store';

const actions: SliceReducers<IPatientsProps> = {
  setError(state, action) {
    state.error = action.payload;
  },
  setPatientsList(state, action: IAction<IPatientList>) {
    state.patientsList = action.payload;
  },
  setPatientAlertDetails(state, action: IAction<AlertDetailsProps[]>) {
    state.patientAlertDetails = action.payload;
  }
};

export default actions;
