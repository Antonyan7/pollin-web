import { format } from 'date-fns';

import { BookingProps } from '../../../types/reduxTypes/booking';

export const getInitialState = () =>
  ({
    appointments: [],
    date: format(new Date(), 'yyyy-MM-dd'),
    serviceProviders: [],
    isCalendarLoading: false,
    currentServiceProviderId: '',
    currentAppointmentId: '',
    error: null,
    patientList: [],
    serviceTypes: [],
    appointmentDetails: null
  } as BookingProps);
