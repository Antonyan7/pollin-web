import { PatientEmrProps } from 'types/reduxTypes/patient-emr';

export const getInitialState = (): PatientEmrProps => ({
  patientsList: {
    searchFilters: [],
    list: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    patientAlertDetails: [],
    currentPatientId: ''
  },
  isPatientsListLoading: false,
  isEncountersListLoading: false,
  isPatientsFiltersLoading: false,
  encounters: {
    list: { encounters: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    types: [{ id: '', title: '' }],
    encounterDetails: null
  },
  error: null
});
