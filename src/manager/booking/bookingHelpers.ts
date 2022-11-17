import bookingManager from '@axios/booking/bookingManager';
import {
  IPatientAppointment,
  PatientAppointmentsFields,
  PatientAppointmentsFilterOptions,
  PatientAppointmentsSortField
} from '@axios/booking/managerBookingTypes';
import { ISortOrder, SortOrder } from 'types/patient';

import { capitalizeFirst } from '@utils/stringUtils';

interface AppointmentsListParams {
  search: string;
  page: number;
  order: SortOrder | null;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | null;
  filters?: Omit<PatientAppointmentsFilterOptions, 'title'>[];
}

interface AppointmentsListRequestBody {
  searchString: string;
  page: number;
  sortOrder: ISortOrder;
  sortByField: PatientAppointmentsFields;
  filters?: Omit<PatientAppointmentsFilterOptions, 'title'>[];
}

const getAppointmentsListFromParams = async (
  params: AppointmentsListParams = {
    search: '',
    page: 1,
    order: SortOrder.Desc,
    orderBy: PatientAppointmentsSortField.Date
  }
) => {
  const sortOrder = capitalizeFirst<ISortOrder>(params.order ?? SortOrder.Desc);
  const sortByField = capitalizeFirst<PatientAppointmentsFields>(params.orderBy ?? PatientAppointmentsSortField.Date);

  const requestBody: AppointmentsListRequestBody = {
    searchString: params.search,
    page: params.page,
    sortOrder,
    sortByField,
    ...(params.filters?.length ? { filters: params.filters } : {})
  };

  return bookingManager.getAppointmentList(requestBody);
};

const bookingHelpers = {
  getAppointmentsListFromParams
};

export default bookingHelpers;
