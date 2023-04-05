import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import { BookingProps } from 'types/reduxTypes/bookingStateTypes';

import { DateUtil } from '@utils/date/DateUtil';

import { SortOrder } from '../../../types/patient';

export const getInitialState = (): BookingProps => ({
  appointments: [],
  date: DateUtil.representInClinicDate(),
  groupedServiceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  specimenGroupedServiceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  isGroupedServiceProvidersLoading: false,
  isSpecimenGroupedServiceProvidersLoading: false,
  isBookingCalendarLoading: false,
  isCollectionCalendarLoading: false,
  isServiceTypesLoading: false,
  isCheckInLoading: false,
  isCheckInSuccess: false,
  isCheckInAppointmentsLoading: false,
  isRefreshCheckInAppointments: false,
  checkInAppointmentsList: [],
  currentServiceProviderId: '',
  currentSpecimenServiceProviderId: '',
  currentAppointmentId: '',
  patientList: {
    patients: [],
    isLoading: false,
    pageSize: 0,
    currentPage: 0,
    totalItems: 0
  },
  serviceTypes: [],
  isAppointmentEditLoading: false,
  appointmentDetails: null,
  patientAlerts: [],
  profilePatientAppointmentsGroups: {
    upcoming: {
      filter: '',
      appointments: [],
      sortOrder: SortOrder.Asc,
      sortByField: PatientAppointmentsSortField.Date
    },
    past: {
      filter: '',
      appointments: [],
      sortOrder: SortOrder.Asc,
      sortByField: PatientAppointmentsSortField.Date
    }
  },
  isAppointmentLoading: false,
  specimenAppointments: {
    date: DateUtil.representInClinicDate(),
    list: [],
    filters: null,
    selectedFilters: [],
    isFiltersArrayLoading: false
  }
});
