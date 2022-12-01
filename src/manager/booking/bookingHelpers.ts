import bookingManager from '@axios/booking/bookingManager';
import {
  IPatientAppointment,
  PatientAppointmentsFields,
  PatientAppointmentsFilterOption,
  PatientAppointmentsSortField
} from '@axios/booking/managerBookingTypes';
import { ISortOrder, SortOrder } from 'types/patient';

import { capitalizeFirst } from '@utils/stringUtils';

interface AppointmentsListParams {
  page: number;
  order: SortOrder | null;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | null;
  filters?: Omit<PatientAppointmentsFilterOption, 'title'>[];
}

interface AppointmentsListRequestBody {
  page: number;
  sortOrder: ISortOrder;
  sortByField: PatientAppointmentsFields;
  filters?: Omit<PatientAppointmentsFilterOption, 'title'>[];
}

const getAppointmentsListFromParams = async (params: AppointmentsListParams) => {
  const sortOrder = capitalizeFirst<ISortOrder>(params.order ?? SortOrder.Desc);
  const sortByField = capitalizeFirst<PatientAppointmentsFields>(params.orderBy ?? PatientAppointmentsSortField.Date);

  const requestBody: AppointmentsListRequestBody = {
    page: params.page,
    sortOrder,
    sortByField,
    ...(params.filters && params.filters.length ? { filters: params.filters } : {})
  };

  return bookingManager.getAppointmentList(requestBody);
};

const bookingHelpers = {
  getAppointmentsListFromParams
};

export default bookingHelpers;
