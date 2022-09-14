import { PatientEmrProps } from 'types/reduxTypes/patient-emr';

export const getInitialState = (): PatientEmrProps => ({
  patientsList: {
    searchFilters: [],
    list: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
    patientAlertDetails: []
  },
  isPatientsListLoading: false,
  isPatientsFiltersLoading: false,
  encounters: {},
  error: null
});
