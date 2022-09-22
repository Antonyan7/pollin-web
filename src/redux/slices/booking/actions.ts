import { IAction, SliceReducers } from 'redux/store';
import { AppointmentDetailsProps, BookingProps, IAppointment, IServiceProviders } from 'types/reduxTypes/booking';
import { AlertDetailsProps, IPatientList } from 'types/reduxTypes/patient-emr';

const actions: SliceReducers<BookingProps> = {
  setAppointments(state, action: IAction<IAppointment[]>) {
    state.appointments = action.payload;
  },
  setDate(state, action: IAction<string>) {
    state.date = action.payload;
  },
  setServiceProviders(state, action: IAction<IServiceProviders>) {
    state.serviceProviders = action.payload;
  },
  setCurrentServiceProviderId(state, action: IAction<string>) {
    state.currentServiceProviderId = action.payload;
  },
  setCurrentAppointmentId(state, action: IAction<string>) {
    state.currentAppointmentId = action.payload;
  },
  setCalendarLoadingState(state, action: IAction<boolean>) {
    state.isCalendarLoading = action.payload;
  },
  setError(state, action: IAction<string>) {
    state.error = action.payload;
  },
  setPatientsList(state, action: IAction<IPatientList>) {
    state.patientList = action.payload;
  },
  setServiceTypes(state, action: IAction<{ id: string; title: string; isVirtual: boolean }[]>) {
    state.serviceTypes = action.payload;
  },
  setAppointmentDetails(state, action: IAction<AppointmentDetailsProps | null>) {
    state.appointmentDetails = action.payload;
  },
  setPatientAlerts(state, action: IAction<AlertDetailsProps[] | null>) {
    state.patientAlerts = action.payload;
  }
};

export default actions;
