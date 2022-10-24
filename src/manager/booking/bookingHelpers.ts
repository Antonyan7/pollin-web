import bookingManager from '@axios/booking/bookingManager';
import { IPatientAppointment } from '@axios/booking/managerBookingTypes';
import * as Sentry from '@sentry/nextjs';
import { SortOrder } from 'types/patient';

import { capitalizeFirst } from '@utils/stringUtils';

interface AppointmentsListParams {
  search: string;
  page: number;
  order: SortOrder | undefined;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | undefined;
}

const getAppointmentsListFromParams = async (params?: AppointmentsListParams) => {
  try {
    const sortOrder = params?.order && capitalizeFirst<'Asc' | 'Desc'>(params.order);
    const sortByField = params?.orderBy && capitalizeFirst<'Type' | 'Date' | 'Status'>(params.orderBy);

    const requestBody = params && {
      searchString: params.search,
      page: params.page + 1,
      ...(params.order ? { sortOrder } : {}),
      ...(params.orderBy ? { sortByField } : {})
    };

    const defaultBody = {
      searchString: '',
      page: 1
    };

    return await bookingManager.getAppointmentList(requestBody ?? defaultBody);
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

const bookingHelpers = {
  getAppointmentsListFromParams
};

export default bookingHelpers;
