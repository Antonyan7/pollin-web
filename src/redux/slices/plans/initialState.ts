import { IPlansSliceInitialState } from 'types/reduxTypes/plansTypes';

export const getInitialState = (): IPlansSliceInitialState => ({
  statusVariations: [],
  isStatusVariationsLoading: false,
  plansList: null,
  isPlansListLoading: false,
  categories: [],
  isCategoriesLoading: false,
  isReadyToOrderPlansLoading: false,
  isReadyToOrderPlansUpdating: false,
  readyToOrderPatientPlans: [],
  isCreatingPlan: false,
  isPatientPreliminaryBloodsResultsLoading: false,
  patientPreliminaryBloodsResults: [],
  planDetails: {
    isPlanDetailsLoading: false,
    details: null
  }
});
