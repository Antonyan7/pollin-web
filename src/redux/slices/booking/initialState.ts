import { format } from 'date-fns';
import { BookingProps } from 'types/reduxTypes/bookingStateTypes';

export const getInitialState = (): BookingProps => ({
  appointments: [],
  date: format(new Date(), 'yyyy-MM-dd'),
  serviceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  groupedServiceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  isServiceProvidersLoading: false,
  isGroupedServiceProvidersLoading: false,
  isCalendarLoading: false,
  isServiceTypesLoading: false,
  currentServiceProviderId: '',
  currentAppointmentId: '',
  error: null,
  patientList: {
    patients: [],
    isLoading: false,
    pageSize: 0,
    currentPage: 0,
    totalItems: 0
  },
  serviceTypes: [],
  appointmentDetails: null,
  patientAlerts: [],
  isAppointmentLoading: false,
  isSaveButtonDisabled: true,
  appointmentStatus: {
    create: { fail: false, success: false },
    edit: { fail: false, success: false },
    cancel: { fail: false, success: false }
  },
  createAppointmentError: {
    code: '',
    message: ''
  },
  specimenAppointments: {
    filters: [],
    selectedFilters: [],
    isFiltersArrayLoading: false
  }
});
