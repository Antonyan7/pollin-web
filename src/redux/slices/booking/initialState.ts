import { format } from 'date-fns';

import { BookingProps } from '../../../types/reduxTypes/booking';

export const getInitialState = () =>
  ({
    appointments: [],
    date: format(new Date(), 'yyyy-MM-dd'),
    serviceProviders: [],
    currentServiceProviderId: '',
    currentAppointmentId: '',
    error: null
  } as BookingProps);
