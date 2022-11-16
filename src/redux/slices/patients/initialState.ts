import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import { SortOrder } from 'types/patient';
import { PatientEmrProps } from 'types/reduxTypes/patient-emrStateTypes';

export const getInitialState = (): PatientEmrProps => ({
  patientsList: {
    searchFilters: [],
    list: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    patientAlertDetails: [],
    currentPatientId: '',
    currentEncounterId: ''
  },
  isPatientsListLoading: false,
  isEncountersListLoading: false,
  isPatientsFiltersLoading: false,
  isEncountersAddendumLoading: false,
  isEncountersFiltersLoading: false,
  isEncountersDetailsLoading: false,
  isCreateEncounterNoteLoading: false,
  isUpdateEncounterNoteLoading: false,
  isUpdateEncounterAddendumLoading: false,
  isCreateEncounterAddendumLoading: false,
  encounters: {
    list: { encounters: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    filters: [],
    types: [{ id: '', title: '' }],
    encounterDetails: null
  },
  error: null,
  patientProfile: null,
  patientHighlights: null,
  latestTestResults: [],
  profile: {
    isOverviewLoading: false,
    overview: null,
    testResultsHistory: null,
    isTestResultsHistoryLoading: false,
    profileTestResults: null,
    isProfileTestResultsLoading: false
  },
  patientAppointments: {
    list: {
      appointments: null,
      pageSize: 0,
      currentPage: 0,
      totalItems: 0
    },
    filterId: 'allFilterId',
    search: '',
    order: SortOrder.Desc,
    orderBy: PatientAppointmentsSortField.Date
  }
});
