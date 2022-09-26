import { format } from 'date-fns';

import { BookingProps } from '../../../types/reduxTypes/booking';

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
    pageSize: 0,
    currentPage: 0,
    totalItems: 0
  },
  serviceTypes: [],
  appointmentDetails: null,
  patientAlerts: null
});
