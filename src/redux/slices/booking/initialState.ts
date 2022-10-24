import { format } from 'date-fns';
import { BookingProps } from 'types/reduxTypes/bookingStateTypes';

export const getInitialState = (): BookingProps => ({
  appointments: [],
  date: format(new Date(), 'yyyy-MM-dd'),
  serviceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  isServiceProvidersLoading: false,
  isCalendarLoading: false,
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
  isAppointmentLoading: false
});
