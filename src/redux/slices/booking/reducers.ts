import {
  IProvidersCollectionCalendarAppointment,
  SpecimenCollectionFilterOption
} from '@axios/booking/managerBookingTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  AppointmentDetailsProps,
  AppointmentStatusState,
  BookingProps,
  IAppointment,
  IAppointmentErrorState,
  ICheckinAppointment,
  IGroupedServiceProviders,
  IPatientList,
  IServiceProviders,
  IServiceType,
  ISpecimenAppointmentsFilter
} from 'types/reduxTypes/bookingStateTypes';
import { AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

const createReducer = <T extends SliceCaseReducers<BookingProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setBookingAppointments(state, action: IAction<IAppointment[]>) {
    state.appointments = action.payload;
  },
  setDate(state, action: IAction<Date>) {
    state.date = action.payload;
  },
  setCollectionCalendarDate(state, action: IAction<Date>) {
    state.specimenAppointments.date = action.payload;
  },
  updateServiceProviders(state, action: IAction<IServiceProviders>) {
    state.serviceProviders.providers = [...state.serviceProviders.providers, ...action.payload.providers];
  },
  updateGroupedServiceProviders(state, action: IAction<IGroupedServiceProviders>) {
    state.groupedServiceProviders.providers = [...state.groupedServiceProviders.providers, ...action.payload.providers];
    state.groupedServiceProviders.currentPage = action.payload.currentPage;
    state.groupedServiceProviders.totalItems = action.payload.totalItems;
    state.groupedServiceProviders.pageSize = action.payload.pageSize;
    state.groupedServiceProviders.searchString = action.payload.searchString;
  },
  updateSpecimenGroupedServiceProviders(state, action: IAction<IGroupedServiceProviders>) {
    state.specimenGroupedServiceProviders.providers = [
      ...state.specimenGroupedServiceProviders.providers,
      ...action.payload.providers
    ];
    state.specimenGroupedServiceProviders.currentPage = action.payload.currentPage;
    state.specimenGroupedServiceProviders.totalItems = action.payload.totalItems;
    state.specimenGroupedServiceProviders.pageSize = action.payload.pageSize;
    state.specimenGroupedServiceProviders.searchString = action.payload.searchString;
  },
  setIsServiceProvidersLoading(state, action: IAction<boolean>) {
    state.isServiceProvidersLoading = action.payload;
  },
  setIsGroupedServiceProvidersLoading(state, action: IAction<boolean>) {
    state.isGroupedServiceProvidersLoading = action.payload;
  },
  setIsSpecimenGroupedServiceProvidersLoading(state, action: IAction<boolean>) {
    state.isSpecimenGroupedServiceProvidersLoading = action.payload;
  },
  setIsServiceTypesLoading(state, action: IAction<boolean>) {
    state.isServiceTypesLoading = action.payload;
  },
  setServiceProviders(state, action: IAction<IServiceProviders>) {
    state.serviceProviders = action.payload;
  },
  setGroupedServiceProviders(state, action: IAction<IGroupedServiceProviders>) {
    state.groupedServiceProviders = action.payload;
  },
  setSpecimenGroupedServiceProviders(state, action: IAction<IGroupedServiceProviders>) {
    state.specimenGroupedServiceProviders = action.payload;
  },
  setCurrentServiceProviderId(state, action: IAction<string>) {
    state.currentServiceProviderId = action.payload;
  },
  setCurrentSpecimenServiceProviderId(state, action: IAction<string>) {
    state.currentSpecimenServiceProviderId = action.payload;
  },
  setCurrentAppointmentId(state, action: IAction<string>) {
    state.currentAppointmentId = action.payload;
  },
  setBookingCalendarLoadingState(state, action: IAction<boolean>) {
    state.isBookingCalendarLoading = action.payload;
  },
  setCollectionCalendarLoadingState(state, action: IAction<boolean>) {
    state.isCollectionCalendarLoading = action.payload;
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
    state.isAppointmentLoading = action.payload;
  },
  setIsRefreshCheckInAppointments(state, action: IAction<boolean>) {
    state.isRefreshCheckInAppointments = action.payload;
  },
  setIsAppointmentEditLoading(state, action: IAction<boolean>) {
    state.isAppointmentEditLoading = action.payload;
  },
  setAppointmentStatus(state, action: IAction<AppointmentStatusState>) {
    state.appointmentStatus = action.payload;
  },
  setIsCheckInLoading(state, action: IAction<boolean>) {
    state.isCheckInLoading = action.payload;
  },
  setIsCheckInSuccess(state, action: IAction<boolean>) {
    state.isCheckInSuccess = action.payload;
  },
  setCreateAppointmentErrorState(state, action: IAction<IAppointmentErrorState>) {
    state.createAppointmentError = action.payload;
  },
  setEditAppointmentErrorState(state, action: IAction<IAppointmentErrorState>) {
    state.editAppointmentErrorState = action.payload;
  },
  setCancelAppointmentErrorState(state, action: IAction<IAppointmentErrorState>) {
    state.cancelAppointmentErrorState = action.payload;
  },
  setSpecimenAppointmentsFilters(state, action: IAction<ISpecimenAppointmentsFilter[]>) {
    state.specimenAppointments.filters = action.payload;
  },
  setSelectedSpecimenAppointmentsFilters(state, action: IAction<SpecimenCollectionFilterOption[]>) {
    state.specimenAppointments.selectedFilters = action.payload;
  },
  setSpecimenAppointmentsFiltersArrayLoading(state, action: IAction<boolean>) {
    state.specimenAppointments.isFiltersArrayLoading = action.payload;
  },
  setSpecimenAppointments(state, action: IAction<IProvidersCollectionCalendarAppointment[]>) {
    state.specimenAppointments.list = action.payload;
  },
  setIsCheckInAppointmentsLoading(state, action: IAction<boolean>) {
    state.isCheckInAppointmentsLoading = action.payload;
  },
  setCheckInAppointments(state, action: IAction<ICheckinAppointment[]>) {
    state.checkInAppointmentsList = action.payload;
  }
});

export default reducers;
