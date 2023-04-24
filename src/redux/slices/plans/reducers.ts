import { PatientPreliminaryBloodsResults } from '@axios/results/resultsManagerTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import {
  IPatientPlanDetails,
  IPatientPlansCategories,
  IPatientPlansListData,
  IPatientPlansStatus,
  IPlansSliceInitialState,
  IReadyToOrderPatientPlan
} from 'types/reduxTypes/plansTypes';

const createReducer = <T extends SliceCaseReducers<IPlansSliceInitialState>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setPlansList(state, action: IAction<IPatientPlansListData | null>) {
    state.plansList = action.payload;
  },
  setIsPlansListLoading(state, action: IAction<boolean>) {
    state.isPlansListLoading = action.payload;
  },
  setStatusVariations(state, action: IAction<IPatientPlansStatus[]>) {
    state.statusVariations = action.payload;
  },
  setIsStatusVariationsLoading(state, action: IAction<boolean>) {
    state.isStatusVariationsLoading = action.payload;
  },
  setCategories(state, action: IAction<IPatientPlansCategories[]>) {
    state.categories = action.payload;
  },
  setIsCategoriesLoading(state, action: IAction<boolean>) {
    state.isCategoriesLoading = action.payload;
  },
  setReadyToOrderPatientPlans(state, action: IAction<IReadyToOrderPatientPlan[]>) {
    state.readyToOrderPatientPlans = action.payload;
  },
  setIsReadyToOrderPlansLoading(state, action: IAction<boolean>) {
    state.isReadyToOrderPlansLoading = action.payload;
  },
  setIsReadyToOrderPlansUpdating(state, action: IAction<boolean>) {
    state.isReadyToOrderPlansUpdating = action.payload;
  },
  setPatientPreliminaryBloodsResults(state, action: IAction<PatientPreliminaryBloodsResults[]>) {
    state.patientPreliminaryBloodsResults = action.payload;
  },
  setIsPatientPreliminaryBloodsResultsLoading(state, action: IAction<boolean>) {
    state.isCategoriesLoading = action.payload;
  },
  setIsCreatingPlan(state, action: IAction<boolean>) {
    state.isCreatingPlan = action.payload;
  },
  setPatientPlanDetails(state, action: IAction<IPatientPlanDetails>) {
    state.planDetails.details = action.payload;
  },
  setIsPatientPlanDetailsLoading(state, action: IAction<boolean>) {
    state.planDetails.isPlanDetailsLoading = action.payload;
  }
});

export default reducers;
