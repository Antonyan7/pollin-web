import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import { SortOrder } from 'types/patient';
import {
  AppointmentResponseStatus,
  MedicalBackgroundProps,
  PatientEmrProps
} from 'types/reduxTypes/patient-emrStateTypes';

const getMedicalBackgroundInitialState = (): MedicalBackgroundProps => ({
  contact: {
    generalHealth: null,
    patientContactInformation: null,
    manuallyAddressForPrimary: null,
    manuallyAddressForMailing: null,
    isContactInformationLoading: false,
    isContactInformationDataUpdating: false,
    isContactInformationEditButtonClicked: false,
    isGeneralHealthLoading: false,
    isGeneralHealthEditButtonClicked: false,
    isGeneralHealthDataUpdating: false
  },
  medicalHistory: {
    fertilityHistory: null,
    isFertilityHistoryLoading: false,
    isFertilityHistoryDataUpdating: false,
    femalePregnancyInformation: null,
    isFemalePregnancyInformationLoading: false,
    isFemalePregnancyInformationDataUpdating: false
  },
  common: {
    dropdowns: [],
    isDropdownsLoading: false
  }
});

export const getInitialState = (): PatientEmrProps => ({
  patientsList: {
    searchFilters: [],
    list: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    patientAlertDetails: [],
    currentPatientId: '',
    currentEncounterId: ''
  },
  isPatientCustomAlertCreated: false,
  isAlertDeleted: false,
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
  setIsVerifyPatientProfilePhotoLoading: false,
  isPatientAlertViewOpen: true,
  encountersSearchValue: '',
  selectedEncountersFilters: [],
  encounters: {
    list: { encounters: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    filters: [],
    types: [{ id: '', title: '' }],
    encounterDetails: null
  },
  recentAppointments: null,
  isRecentAppointmentsLoading: false,
  error: null,
  patientProfile: null,
  isPatientHighlightsLoading: false,
  isPatientHighlightIntakeComplete: false,
  isPatientHighlightIntakeReminderActive: false,
  isPatientAlertDetailsLoading: false,
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
    filters: null,
    selectedFilters: [],
    order: SortOrder.Asc,
    orderBy: PatientAppointmentsSortField.Date,
    status: AppointmentResponseStatus.IDLE
  },
  isProfileTestResultDetailsLoading: false,
  profileTestResultDetails: [],
  isPatientAppointmentFiltersLoading: false,
  currentPatientAppointmentFilterField: '',
  contactInformation: {
    id: '',
    name: '',
    patientIdentifier: '',
    dateOfBirth: '',
    ohipNumber: '',
    ohipVersionCode: ''
  },
  medicalBackground: getMedicalBackgroundInitialState()
});
