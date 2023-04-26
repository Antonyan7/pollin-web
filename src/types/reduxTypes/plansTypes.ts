import { IPagination } from '@axios/axiosTypes';
import { FieldWithNote, IMedications, SpermSource, SpermType } from '@axios/patientEmr/managerPatientEmrTypes';
import { PatientPreliminaryBloodsResults } from '@axios/results/resultsManagerTypes';

export enum PlanActions {
  MarkAsActive = 'Mark as Active',
  MarkAsCompleted = 'Mark as Completed',
  MarkAsCancelled = 'Cancel Plan'
}

export interface IPatientPlanActionItem {
  id: string;
  title: string;
}

export interface IPatientPlansCategories {
  id: string;
  title: string;
  items: IPatientPlanActionItem[];
}

export interface IPatientPlan {
  id: string;
  title: string;
  date: string;
  status: string;
}

export interface IReadyToOrderPatientPlan extends IPatientPlanActionItem {}

export interface IReadyToOrderPatientPlanResponse {
  patientPlans: IReadyToOrderPatientPlan[];
}

export interface IPatientPlansStatusResponse {
  variations: IPatientPlansStatus[];
}

export interface IPlanMutation {
  planId: string;
}

export interface IPatientPlansStatus {
  status: string;
  title: string;
  actions: IPatientPlanActionItem[];
  label: {
    textColor: string;
    backgroundColor: string;
  };
}

export interface IPatientPlansCategoriesAndTypesResponse {
  categories: IPatientPlansCategories[];
}

export interface IPatientPlansListData extends IPagination {
  isReadyToOrder: string;
  patientPlans: IPatientPlan[];
}

export interface IPatientPlanDetailsReq {
  planId: string;
}

export interface IOrderPatientPlanRequestData {
  patientPlans: { id: string }[];
}

interface IPlanTestResult {
  title: string;
  dateCompleted: string;
  result: string;
}

interface IPlanSource {
  source: {
    value: string;
    donorId: string;
  };
  type: {
    value: string;
  };
}

interface IPlanMonitoring {
  monitoringLocation: {
    value: string;
  };
  cycleNumber: {
    value: string;
  };
  period: string;
}

export interface IPatientPlanDetails {
  patientPlan: {
    id: string;
    title: string;
    date: string;
    status: string;
    GTPAETALS: string;
    testResults: IPlanTestResult[];
    sperm: IPlanSource;
    monitoring: IPlanMonitoring;
    medicationsByCategories: IMedications[];
  };
}

export interface IPatientPlanMedication {
  categoryId: string;
  medicationId: string;
  dosage: string;
  route: string;
  frequency: string;
  time?: string;
  quantity: string;
  refill: string;
  refillNotes?: string;
  doctorNotes?: string;
}

export interface INewPatientPlan {
  patientId: string;
  planTypeId: string;
  monitoring: {
    monitoringLocation: FieldWithNote & { value: string };
    cycleNumber: FieldWithNote & { value: string };
  };
  sperm: {
    source: FieldWithNote & { value: SpermSource | string };
    type: FieldWithNote & { value: SpermType | string };
  };
  medications: IPatientPlanMedication[] | boolean;
}

export interface IPlansSliceInitialState {
  statusVariations: IPatientPlansStatus[];
  isStatusVariationsLoading: boolean;
  categories: IPatientPlansCategories[];
  isCategoriesLoading: boolean;
  plansList: IPatientPlansListData | null;
  isPlansListLoading: boolean;
  isReadyToOrderPlansLoading: boolean;
  isReadyToOrderPlansUpdating: boolean;
  readyToOrderPatientPlans: IReadyToOrderPatientPlan[];
  patientPreliminaryBloodsResults: PatientPreliminaryBloodsResults[];
  isPatientPreliminaryBloodsResultsLoading: boolean;
  isCreatingPlan: boolean;
  planDetails: {
    isPlanDetailsLoading: boolean;
    details: IPatientPlanDetails | null;
  };
}
