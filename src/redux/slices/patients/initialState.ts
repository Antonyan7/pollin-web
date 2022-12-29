import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import { SortOrder } from 'types/patient';
import { AppointmentResponseStatus, PatientEmrProps } from 'types/reduxTypes/patient-emrStateTypes';

export const getInitialState = (): PatientEmrProps => ({
  patientsList: {
    searchFilters: [],
    list: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    patientAlertDetails: [],
    currentPatientId: '',
    currentEncounterId: ''
  },
  isPatientsListLoading: false,
  isPatientProfileLoading: false,
  isEncountersListLoading: false,
  isPatientsFiltersLoading: false,
  isEncountersAddendumLoading: false,
  isEncountersFiltersLoading: false,
  isEncountersDetailsLoading: false,
  isCreateEncounterNoteLoading: false,
  isUpdateEncounterNoteLoading: false,
  isUpdateEncounterAddendumLoading: false,
  isCreateEncounterAddendumLoading: false,
  isPatientContactInformationLoading: false,
  isPatientAlertViewOpen: true,
  encounters: {
    list: { encounters: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    filters: [],
    types: [{ id: '', title: '' }],
    encounterDetails: null
  },
  error: null,
  patientProfile: null,
  isPatientHighlightsLoading: false,
  isPatientHighlightIntakeComplete: false,
  isPatientHighlightIntakeReminderActive: false,
  patientHighlightHeader: {
    contact: {
      uiid: '',
      title: ''
    },
    ohip: {
      uiid: '',
      title: ''
    },
    doctor: {
      uiid: '',
      title: ''
    }
  },
  patientHighlights: null,
  latestTestResults: [],
  profile: {
    isOverviewLoading: false,
    overview: null,
    testResultsHistory: [],
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
    filters: null,
    selectedFilters: [],
    order: SortOrder.Desc,
    orderBy: PatientAppointmentsSortField.Date,
    status: AppointmentResponseStatus.IDLE
  },
  isPatientAppointmentFiltersLoading: false,
  currentPatientAppointmentFilterField: '',
  contactInformation: {
    id: '',
    name: '',
    patientIdentifier: '',
    dateOfBirth: '',
    ohipNumber: '',
    ohipVersionCode: ''
  }
});
