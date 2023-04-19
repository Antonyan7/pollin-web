import { IPagination } from '@axios/axiosTypes';
import {
  IPatientAppointment,
  IPatientAppointmentsListFilter,
  IPatientRecentAppointment,
  PatientAppointmentsFilterOption
} from '@axios/booking/managerBookingTypes';
import {
  AddManuallyAddressModalProps,
  IDropdown,
  IDrugsProps,
  IEncounterDetailsProps,
  IFemalePatientGynaecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryProps,
  IFemalePregnancyInformationProps,
  IFertilityHistoryProps,
  IGeneralHealthProps,
  IGenitourinaryHistory,
  IPatientBackgroundPartners,
  IPatientContactInformation,
  IPatientContactInformationProps,
  IPatientMedications,
  IPatientMedicationsState,
  IPatientPlanDetails,
  IPatientPlansCategories,
  IPatientPlansListData,
  IPatientPlansStatus,
  IPatientPrescriptions,
  IPrescriptionStatusesVariations,
  IProfileTestResults,
  IReadyToOrderPatientPlan,
  ITestResultHistory,
  IUpdateEncounterNoteRequest,
  LatestTestResultType,
  PatientPrescriptionsDrugListProps,
  ProfileTestResultDetailsItem
} from '@axios/patientEmr/managerPatientEmrTypes';
import { PatientPreliminaryBloodsResults } from '@axios/results/resultsManagerTypes';
import { IEncountersFilterOption, IPatientsFilterOption, PatientListFilterType, SortOrder } from 'types/patient';

interface IProfileProps {
  isOverviewLoading: boolean;
  overview: PatientProfileOverview | null;
  testResultsHistory: ITestResultHistory | null;
  profileTestResults: IProfileTestResults | null;
  isTestResultsHistoryLoading: boolean;
  isProfileTestResultsLoading: boolean;
}

interface IPatientBackgroundProps {
  patientBackgroundInformation: IPatientBackgroundPartners | null;
  isPatientBackgroundInformationLoading: boolean;
  isUpdatePatientBackgroundInformationLoading: boolean;
  isPatientBackgroundEditButtonClicked: boolean;
}

export interface MedicalBackgroundProps {
  contact: {
    patientBackground: IPatientBackgroundProps;
    generalHealth: IGeneralHealthProps | null;
    patientContactInformation: IPatientContactInformationProps | null;
    manuallyAddressForPrimary: AddManuallyAddressModalProps | null;
    manuallyAddressForMailing: AddManuallyAddressModalProps | null;
    isContactInformationLoading: boolean;
    isContactInformationEditButtonClicked: boolean;
    isGeneralHealthLoading: boolean;
    isGeneralHealthEditButtonClicked: boolean;
    isGeneralHealthDataUpdating: boolean;
    isContactInformationDataUpdating: boolean;
  };
  medicalHistory: {
    fertilityHistory: IFertilityHistoryProps | null;
    isFertilityHistoryLoading: boolean;
    isFertilityHistoryDataUpdating: boolean;
    femalePregnancyInformation: IFemalePregnancyInformationProps | null;
    isFemalePregnancyInformationLoading: boolean;
    isFemalePregnancyInformationDataUpdating: boolean;
    femalePatientGynaecologicalHistory: IFemalePatientGynaecologicalHistoryProps | null;
    isFemalePatientGynaecologicalHistoryLoading: boolean;
    isFemalePatientGynaecologicalHistoryDataUpdating: boolean;
    femalePatientMenstrualCycleHistory: IFemalePatientMenstrualCycleHistoryProps | null;
    isFemalePatientMenstrualCycleHistoryLoading: boolean;
    isFemalePatientMenstrualCycleHistoryDataUpdating: boolean;
    isMalePatientGenitourinaryHistoryLoading: boolean;
    malePatientGenitourinaryHistory: IGenitourinaryHistory | null;
    isMalePatientGenitourinaryEditButtonClicked: boolean;
  };
  common: {
    dropdowns: IDropdown[];
    isDropdownsLoading: boolean;
  };
}

export interface MedicationsPrescriptionsProps {
  medications: {
    drugs: IDrugsProps[] | null;
    isDrugLoading: boolean;
    dropdownOptions: IDropdown[] | null;
    isDropdownOptionsLoading: boolean;
    isMedicationCreatedLoading: boolean;
    patientCurrentMedications: IPatientMedications;
    patientPastMedications: IPatientMedications;
    patientMissingMedications: IPatientMedications;
    isPatientPastMedicationLoading: boolean;
    isPatientCurrentMedicationLoading: boolean;
    isMedicationUpdatedLoading: boolean;
    isCardInEditMode: boolean[];
    patientMedicationState: IPatientMedicationsState | null;
  };
  prescriptions: {
    prescriptionsDrugList: PatientPrescriptionsDrugListProps[] | null;
    isPrescriptionCreationLoading: boolean;
    currentPrescriptionUuid: string;
    patientPrescriptions: IPatientPrescriptions;
    prescriptionStatuses: IPrescriptionStatusesVariations[];
    isPatientPrescriptionsLoading: boolean;
    isDownloadPrescriptionLoading: boolean;
  };
}

export interface IPatientPlansProps {
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

export interface ICreateMedication {
  patientId: string;
  medication: {
    drugId: string;
    dosage: string;
    route: string;
    frequency: string;
    time?: string;
    duration: {
      start: string;
      end: string;
    };
    prescriber?: string;
  };
}

export interface IUpdateMedication {
  patientId: string;
  medication: {
    id: string;
    dosage: string;
    route: string;
    frequency: string;
    time?: string;
    duration: {
      start: string;
      end: string;
    };
  };
}

export interface PatientEmrProps {
  patientsList: IPatientsProps;
  isBookingRequestToPatientLoading: boolean;
  medicationsPrescriptions: MedicationsPrescriptionsProps;
  encountersSearchValue: string;
  selectedEncountersFilters: IEncountersFilterOption[];
  encounters: IEncountersProps;
  recentAppointments: IPatientRecentAppointment[] | null;
  isPatientCustomAlertCreated: boolean;
  isAlertDeleted: boolean;
  isRecentAppointmentsLoading: boolean;
  isPatientProfileLoading: boolean;
  isPatientsListLoading: boolean;
  isEncountersListLoading: boolean;
  isPatientsFiltersLoading: boolean;
  isEncountersAddendumLoading: boolean;
  isEncountersFiltersLoading: boolean;
  isVerifyPatientProfilePhotoLoading: boolean;
  isEncountersDetailsLoading: boolean;
  isCreateEncounterNoteLoading: boolean;
  isUpdateEncounterNoteLoading: boolean;
  isUpdateEncounterAddendumLoading: boolean;
  isCreateEncounterAddendumLoading: boolean;
  isPatientContactInformationLoading: boolean;
  isPatientAlertDetailsLoading: boolean;
  isPatientAlertViewOpen: boolean;
  isProfileTestResultDetailsLoading: boolean;
  profileTestResultDetails: ProfileTestResultDetailsItem[];
  patientProfile: PatientProfile | null;
  medicalBackground: MedicalBackgroundProps;
  isPatientHighlightsLoading: boolean;
  isPatientHighlightIntakeComplete: boolean;
  isICFormComplete: boolean;
  isPatientHighlightIntakeReminderActive: boolean;
  patientHighlightHeader: PatientHighlightHeader;
  patientHighlights: PatientHighlight[] | null;
  patientAppointments: IPatientAppointmentsProps;
  isPatientAppointmentFiltersLoading: boolean;
  latestTestResults: ITestResultLatest[];
  profile: IProfileProps;
  currentPatientAppointmentFilterField: string;
  contactInformation: IPatientContactInformation;
  plans: IPatientPlansProps;
}

export interface IItem {
  title: string;
  lineItems: {
    title: string;
    uuid?: string;
  }[];
}

export interface PatientProfileOverview {
  widgetTitle: string;
  items: IItem[];
}

export interface PatientHighlightHeader {
  contact: {
    uiid: string;
    title: string;
  };
  ohip: {
    uiid: string;
    title: string;
  };
  doctor: {
    uiid: string;
    title: string;
  };
}

export interface PatientHighlight {
  uiid?: string;
  title: string;
  items: string[];
}
export enum ProfilePhotoStatus {
  Verified = 'Verified',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Missing = 'Missing'
}

export enum AlertStatus {
  Intake = 'Intake',
  Verification = 'Verification',
  PhotoMissing = 'PhotoMissing'
}

export interface PatientProfile {
  subTitle: string;
  isIntakeComplete: boolean;
  fullName: string;
  pronoun: string;
  isICFormComplete: boolean;
  cycleStatus?: string | boolean;
  id: string;
  avatar?: {
    imageURL: string;
    status: ProfilePhotoStatus;
  };
  identifier?: string;
  dateOfBirth?: string;
  sexAtBirth?: SexAtBirth;
  GTPAETALS?: string;
}
export enum SexAtBirth {
  Female = 'Female',
  Male = 'Male'
}

export interface IEncounterDataProps {
  title: string;
  content: string;
  author: string;
  createdOn: string;
  updatedOn?: string;
}

interface IEncounterFilterOption {
  id: string;
  title: string;
}

export interface IEncounterFilterProps {
  type: string;
  title: string;
  options: IEncounterFilterOption[];
}

export interface IEncounterFilters {
  filters: IEncounterFilterProps[];
}

interface IPatientsProps {
  searchFilters: IFilterCategory[];
  list: IPatientList;
  patientAlertDetails: AlertDetailsProps[];
  currentPatientId: string;
  currentEncounterId: string;
}

export interface ITestResultLatest {
  title: string;
  dateCollected: string;
  result: LatestTestResultType;
}

export interface ILatestTestResult {
  testResults: ITestResultLatest[];
}
export interface IFilterCategory {
  type: PatientListFilterType;
  title: string;
  options: IPatientsFilterOption[];
}
export interface IPatientList extends IPagination {
  patients: IPatientListData[];
}

export interface IPatientListData {
  id: string;
  name: string;
  subString: string;
  doctorAssigned: string;
  alertsCount: number;
  dateOfBirth: string;
  cycleStatus: string;
  doctor: string;
}

export interface AlertDetailsMessagesProps {
  title: string;
}

export interface AlertDetailsProps {
  title: string;
  id?: string;
  isEditable: boolean;
  createdBy?: {
    name: string;
    date: string;
  };
  messages: AlertDetailsMessagesProps[];
}

export interface IEncounterDetailsResponse {
  encounter: IEncounterDetailsProps;
}

interface IEncountersProps {
  list: IEncounterList;
  filters: IEncounterFilterProps[] | null;
  types: IEncounterType[];
  encounterDetails: IEncounterDetailsProps | null;
}

export interface IEncounterType {
  id: string;
  title: string;
}
export interface IEncounterList extends IPagination {
  encounters: IEncounterListItem[];
}

export interface IEncounterListItem {
  id: string;
  title: string;
  createdOn: string;
  contentPreview: string;
  author: string;
  index?: number;
}

interface IEncounterNoteProps {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

export interface IPatientAppointmentsList extends IPagination {
  appointments: IPatientAppointment[] | null;
}

export enum AppointmentResponseStatus {
  IDLE = 'idle',
  SUCCESS = 'success',
  FAIL = 'fail'
}
export interface GroupedFiltersOption extends PatientAppointmentsFilterOption {
  groupTitle: string;
}
export interface IPatientAppointmentsProps {
  list: IPatientAppointmentsList;
  orderBy: Exclude<keyof IPatientAppointment, 'time'> | null;
  order: SortOrder | null;
  filters: IPatientAppointmentsListFilter[] | null;
  selectedFilters: GroupedFiltersOption[];
  status: AppointmentResponseStatus;
}

export interface ICreateEncounterNoteProps extends IEncounterNoteProps {}
export interface IUpdateEncounterNoteProps extends IUpdateEncounterNoteRequest {}
