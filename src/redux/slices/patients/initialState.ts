import { IPatientsProps } from '@axios/managerPatientEmr';

export const getInitialState = (): IPatientsProps => ({
  searchFilters: [],
  patientsList: { patients: [], pageSize: 0, currentPage: 0, totalItems: 0 },
  patientAlertDetails: [],
  error: null
});
