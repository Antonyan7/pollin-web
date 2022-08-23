import { IAction, SliceReducers } from 'redux/store';

import { BookingProps, IAppointment, IServiceProvider } from '../../../types/reduxTypes/booking';

const actions: SliceReducers<BookingProps> = {
  setAppointments(state, action: IAction<IAppointment[]>) {
    state.appointments = action.payload;
  },
  setDate(state, action: IAction<string>) {
    state.date = action.payload;
  },
  setServiceProviders(state, action: IAction<IServiceProvider[]>) {
    state.serviceProviders = action.payload;
  },
  setCurrentServiceProviderId(state, action: IAction<string>) {
    state.currentServiceProviderId = action.payload;
  },
  setCurrentAppointmentId(state, action: IAction<string>) {
    state.currentAppointmentId = action.payload;
  },
  setError(state, action: IAction<string>) {
    state.error = action.payload;
  }
};

export default actions;
