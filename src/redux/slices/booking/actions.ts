import { IAction, SliceReducers } from 'redux/store';
import { AppointmentDetailsProps, BookingProps, IAppointment, IServiceProvider } from 'types/reduxTypes/booking';

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
  },
  setPatientNames(state, action: IAction<{ id: string; title: string }[]>) {
    state.patientList = action.payload;
  },
  setServiceTypes(state, action: IAction<{ id: string; title: string; isVirtual: boolean }[]>) {
    state.serviceTypes = action.payload;
  },
  setAppointmentDetails(state, action: IAction<AppointmentDetailsProps | null>) {
    state.appointmentDetails = action.payload;
  }
};

export default actions;
