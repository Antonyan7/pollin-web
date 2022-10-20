import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  AppointmentDetailsProps,
  BookingProps,
  IAppointment,
  IPatientList,
  IServiceProviders,
  IServiceType
} from 'types/reduxTypes/bookingStateTypes';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

const createReducer = <T extends SliceCaseReducers<BookingProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setAppointments(state, action: IAction<IAppointment[]>) {
    state.appointments = action.payload;
  },
  setDate(state, action: IAction<string>) {
    state.date = action.payload;
  },
  updateServiceProviders(state, action: IAction<IServiceProviders>) {
    state.serviceProviders.providers = [...state.serviceProviders.providers, ...action.payload.providers];
  },
  setIsServiceProvidersLoading(state, action: IAction<boolean>) {
    state.isServiceProvidersLoading = action.payload;
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
  setPatientListLoading(state, action: IAction<boolean>) {
    state.patientList.isLoading = action.payload;
  },
  updatePatientsList(state, action: IAction<IPatientList>) {
    state.patientList.patients = [...state.patientList.patients, ...action.payload.patients];
    state.patientList.isLoading = action.payload.isLoading;
    state.patientList.currentPage = action.payload.currentPage;
    state.patientList.pageSize = action.payload.pageSize;
    state.patientList.totalItems = action.payload.totalItems;
  },
  setServiceTypes(state, action: IAction<IServiceType[]>) {
    state.serviceTypes = action.payload;
  },
  setAppointmentDetails(state, action: IAction<AppointmentDetailsProps | null>) {
    state.appointmentDetails = action.payload;
  },
  setPatientAlerts(state, action: IAction<AlertDetailsProps[]>) {
    state.patientAlerts = action.payload;
  },
  setAppointmentLoading(state, action: IAction<boolean>) {
    state.isAppoitmentLoading = action.payload;
  }
});

export default reducers;
