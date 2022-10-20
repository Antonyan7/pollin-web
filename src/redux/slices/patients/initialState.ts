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
  encounters: {
    list: { encounters: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    filters: [],
    types: [{ id: '', title: '' }],
    encounterDetails: null
  },
  error: null,
  patientProfile: null,
  patientHighlights: null
});
