import bookingManager from '@axios/booking/bookingManager';
import { IPatientAppointment, PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import { SortOrder } from 'types/patient';

import { capitalizeFirst } from '@utils/stringUtils';

interface AppointmentsListParams {
  search: string;
  filterId: string;
  page: number;
  order: SortOrder | null;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | null;
}

const getAppointmentsListFromParams = async (
  params: AppointmentsListParams = {
    search: '',
    filterId: 'allFilterId',
    page: 1,
    order: SortOrder.Desc,
    orderBy: PatientAppointmentsSortField.Date
  }
) => {
  const sortOrder = capitalizeFirst<'Asc' | 'Desc'>(params.order ?? SortOrder.Desc);
  const sortByField = capitalizeFirst<'Type' | 'Date' | 'Status'>(params.orderBy ?? PatientAppointmentsSortField.Date);

  const requestBody = {
    searchString: params.search,
    page: params.page,
    filterId: params.filterId,
    sortOrder,
    sortByField
  };

  return bookingManager.getAppointmentList(requestBody);
};

const bookingHelpers = {
  getAppointmentsListFromParams
};

export default bookingHelpers;
