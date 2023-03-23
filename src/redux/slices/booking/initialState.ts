import { BookingProps } from 'types/reduxTypes/bookingStateTypes';

import { DateUtil } from '@utils/date/DateUtil';

export const getInitialState = (): BookingProps => ({
  appointments: [],
  date: DateUtil.representInClinicDate(),
  serviceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  groupedServiceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  specimenGroupedServiceProviders: { providers: [], pageSize: 25, currentPage: 0, totalItems: 0 },
  isServiceProvidersLoading: false,
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
  error: null,
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
  isAppointmentLoading: false,
  appointmentStatus: {
    create: { fail: false, success: false },
    edit: { fail: false, success: false },
    cancel: { fail: false, success: false }
  },
  createAppointmentError: {
    code: '',
    message: ''
  },
  editAppointmentErrorState: {
    code: '',
    message: ''
  },
  cancelAppointmentErrorState: {
    code: '',
    message: ''
  },
  specimenAppointments: {
    date: DateUtil.representInClinicDate(),
    list: [],
    filters: null,
    selectedFilters: [],
    isFiltersArrayLoading: false
  }
});
