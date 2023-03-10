import { PatientListFilterType } from 'types/patient';
import { IServiceProvider } from 'types/reduxTypes/bookingStateTypes';
import {
  AlertDetailsProps,
  IEncounterFilterProps,
  IEncounterListItem,
  IEncounterType,
  IFilterCategory,
  IPatientListData,
  PatientHighlight,
  PatientHighlightHeader,
  PatientProfileOverview
} from 'types/reduxTypes/patient-emrStateTypes';

export interface IGetPatientsRequestBody {
  name: string;
  page?: number;
}

export interface IGetPatientsResponse {
  patients: IPatientsData[];
}

export interface IPatientsData {
  id: string;
  title: string;
}

export interface IAlertDetailsResponse {
  alerts?: AlertDetailsProps[];
}

export interface IPatientDataAlert {
  count: number;
}

export interface BlockSchedulingProps {
  resourceId: string;
  startDate: string;
  endDate: string;
  placeholderLabel: string;
  slots?: IServiceProvider[];
}

export interface IOptionsProps {
  title?: string;
  type: PatientListFilterType | string;
  id: string;
  titleName?: string;
}

export interface GroupedByTitlesProps {
  options: IOptionsProps;
}

export interface IPatientsFilterOption {
  type: PatientListFilterType;
  id: string;
}

export interface IPatientsFiltersResponse {
  filters: IFilterCategory[];
}
export interface IPatientsListResponse {
  patients: IPatientListData[];
}

export interface IPatientEncountersListResponse {
  encounters: IEncounterListItem[];
}

interface IEncounterNoteRequest {
  patientId: string;
  encountersTypeId: string;
  content: string;
}

interface IEncounterAddendumRequest {
  encounterId: string;
  content: string;
}

export interface IEncounterTypesResponse {
  encountersTypes: IEncounterType[];
}

export interface AddendumsProps {
  id: string;
  content: string;
  author: string;
  date: Date | string;
  isEdited: boolean;
}

export interface IEncounterDetailsProps {
  id: string;
  title: string;
  author: string;
  createdOn: Date | string;
  updatedOn?: Date | string;
  content: string;
  addendums: AddendumsProps[];
}

export interface IPatientProfileResponse {
  title: string;
  subTitle: string;
  cycleStatus: string;
  imageURL: string;
}

export interface IPatientHighlightResponse {
  isIntakeComplete: boolean;
  isIntakeReminderActive: boolean;
  header: PatientHighlightHeader;
  highlights: PatientHighlight[];
}

export interface IPatientPartnerData {
  name: string;
  patientId: string;
  pronoun: string;
  subTitle: string;
  relation: string;
}

interface IPatientHighlightDetailPartner {
  type: 'Partner';
  title: string; // title of the modal field
  partner?: IPatientPartnerData; // values of the modal field
}

export interface IPatientMedicationData {
  title: string;
  dosage: string;
}

interface IPatientHighlightDetailMedications {
  type: 'Medications';
  title: string; // title of the modal field
  medications: IPatientMedicationData[]; // values of the modal field
}

interface IPatientHighlightDetailLineItems {
  type: 'LineItems';
  title: string; // title of the modal field
  lineItems: string[]; // values of the modal field
}

type PatientHighlightDetail =
  | IPatientHighlightDetailPartner
  | IPatientHighlightDetailMedications
  | IPatientHighlightDetailLineItems;

export interface IPatientHighlightDetailsResponse {
  widgetTitle: string; // Title of the patient highlight modal
  highlightDetails: PatientHighlightDetail[]; // modal type and entries
}

export interface IPatientProfileOverviewResponse {
  overview: PatientProfileOverview;
}

export interface ITestResultHistoryResponse {
  testResultsHistory: ITestResultHistory;
}

export interface IPatientContactInformation {
  id: string;
  patientIdentifier: string;
  name: string;
  dateOfBirth: string;
  ohipNumber: string;
  ohipVersionCode: string;
}

export interface IPatientContactInformationResponse {
  information: IPatientContactInformation;
}

export interface ICreateEncounterNoteRequest extends IEncounterNoteRequest {
  appointmentId?: string;
}
export interface IUpdateEncounterNoteRequest {
  id: string;
  content: string;
}

export interface ICreateEncounterAddendumRequest extends IEncounterAddendumRequest {}

export interface IEncounterFilterResponse {
  filters: IEncounterFilterProps[];
}

interface IAddendum {
  id: string;
  content: string;
  author: string;
  date: string;
  isEdited: boolean;
}

export interface IEncounterResponse {
  encounter: {
    id: string;
    content: string;
    updatedOn?: string;
    createdOn: string;
    title: string;
    author: string;
    addendums?: IAddendum[];
  };
}
export interface IUpdateEncounterAddendumRequest {
  id: string;
  content: string;
}

export enum LatestTestResultType {
  Normal = 'Normal',
  Abnormal = 'Abnormal'
}

export interface ITestResultHistoryItem {
  title: string;
}

export interface ITestResultHistory {
  widgetTitle: string;
  items: ITestResultHistoryItem[];
}

export interface IPatientTestResult {
  widgetTitle: string;
  testResults: ITestResult[];
}

export interface IProfileData {
  name: string;
  contribution: string;
}

export enum TestResultItemType {
  NONE = 'None',
  ORDER_GROUP = 'OrderGroup',
  TEST_TYPE = 'TestType'
}

export interface ITestTypeItem {
  title: string;
  type: TestResultItemType;
  id?: string;
}

export interface ITestResult {
  title: string;
  items: ITestTypeItem[];
}

export interface IPartner {
  widgetTitle: string;
  patientId: string;
  profile: IProfileData;
  testResults: ITestResult[];
}
export interface IProfileTestResults {
  patient: IPatientTestResult;
  partners?: IPartner[];
}

export interface IProfileTestResultDetailsReqBody {
  id: string;
  type: TestResultItemType;
}

export interface ProfileTestResultDetailsItem {
  dateCompleted: string;
  title: string;
  unit: string;
  testTypeId?: string;
  result: string;
  status: string;
  finalResultType: string;
}

export interface IProfileTestResultDetailsResponse {
  testResults: ProfileTestResultDetailsItem[];
}
export interface MedicalBackgroundFieldValues {
  isEditable: boolean;
  note: string;
}

export interface AllegiesFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface HeightProps extends MedicalBackgroundFieldValues {
  inches: number;
  feet: number;
}

export interface WeightInLbsProps extends MedicalBackgroundFieldValues {
  value: number;
}

export interface BmiProps extends MedicalBackgroundFieldValues {
  value: number;
}

export interface MedicalProblemsProps extends MedicalBackgroundFieldValues {
  exists: boolean;
  items: { id: string }[];
}

export interface PastSurgeriesProps extends MedicalBackgroundFieldValues {
  exists: boolean;
  items: { typeOfSurgery: string; dateOfSurgery: Date | string }[];
}

export interface ProblemWithAnestheticsProps extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface CurrentPrescribedMedicationsProps extends MedicalBackgroundFieldValues {
  items: { name: string; dosage: string }[];
}

export interface VitaminSupplementsProps extends MedicalBackgroundFieldValues {
  items: { title: string; dosage: string }[];
}

export interface DrugAllergiesProps extends MedicalBackgroundFieldValues {
  exists: true;
  items: { title: string }[];
}

export interface FoodAllergiesProps extends MedicalBackgroundFieldValues {
  exists: true;
  items: { title: string }[];
}

export interface CurrentStressLevelProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface FamilyHistoryProps extends MedicalBackgroundFieldValues {
  exists: true;
  items: { title: string; familyMemberName: string }[];
}

export interface DietProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface ActiveConsultsListProps extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface AdditionalInformationProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IGeneralHealthProps {
  height: HeightProps;
  weightInLbs: WeightInLbsProps;
  bmi: BmiProps;
  medicalProblems: MedicalProblemsProps;
  pastSurgeries: PastSurgeriesProps;
  problemWithAnesthetics: ProblemWithAnestheticsProps;
  currentPrescribedMedications: CurrentPrescribedMedicationsProps;
  vitaminSupplements: VitaminSupplementsProps;
  drugAllergies: DrugAllergiesProps;
  foodAllergies: FoodAllergiesProps;
  latexAllergy: AllegiesFieldValues;
  iodineAllergy: AllegiesFieldValues;
  smokeCigarettes: AllegiesFieldValues;
  drinkAlcohol: AllegiesFieldValues;
  useMarijuana: AllegiesFieldValues;
  recreationalDrugs: AllegiesFieldValues;
  regularExercise: AllegiesFieldValues;
  currentStressLevel: CurrentStressLevelProps;
  seeingTherapist: AllegiesFieldValues;
  familyHistory: FamilyHistoryProps;
  stdHistory: AllegiesFieldValues;
  diet: DietProps;
  activeConsultsList: ActiveConsultsListProps;
  additionalInformation: AdditionalInformationProps;
}

export interface IGeneralHealth {
  generalHealth: IGeneralHealthProps;
}

export interface IsTryingForPregnancyFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface UsingLubricantsFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface SeenFertilitySpecialistFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface OvulationIntercourseFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface OvulationTrackingFieldValues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface MonthsConceivingFieldValues extends MedicalBackgroundFieldValues {
  value: string;
}

export interface PreviousTreatmentFieldProps extends MedicalBackgroundFieldValues {
  exists: boolean;
  treatments: { id?: string; type: string; cycles: string }[];
}

export interface IFertilityHistoryProps {
  isTryingForPregnancy?: IsTryingForPregnancyFieldValues;
  monthsConceiving?: MonthsConceivingFieldValues;
  ovulationTracking?: OvulationTrackingFieldValues;
  ovulationIntercourse?: OvulationIntercourseFieldValues;
  usingLubricants?: UsingLubricantsFieldValues;
  seenFertilitySpecialist?: SeenFertilitySpecialistFieldValues;
  previousTreatment?: PreviousTreatmentFieldProps;
}

export interface IFertilityHistory {
  fertilityHistory: IFertilityHistoryProps;
}

export interface IdentifierFieldProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface PatientNameProps extends MedicalBackgroundFieldValues {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface PreferredNamaProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface ContributionProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface AddressProps extends MedicalBackgroundFieldValues {
  streetAddress: string;
  unitNumber: string;
  postalCode: string;
  province: string;
  city: string;
  country: string;
}

export interface EmailAddressProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface PhoneNumberProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface OHIPProps extends MedicalBackgroundFieldValues {
  exists: boolean;
  number: string;
  versionCode: string;
}

export interface ResponsiblePhysicianProps extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IPatientContactInformationProps {
  identifier: IdentifierFieldProps;
  patientName: PatientNameProps;
  preferredName: PreferredNamaProps;
  contribution: ContributionProps;
  primaryAddress: AddressProps;
  mailingAddress: AddressProps;
  emailAddress: EmailAddressProps;
  phoneNumber: PhoneNumberProps;
  OHIP: OHIPProps;
  responsiblePhysician: ResponsiblePhysicianProps;
}

export interface IMedicalContactInformation {
  contactInformation: IPatientContactInformationProps;
}
export interface AddManuallyAddressModalProps {
  streetAddress: string;
  unitNumber: string;
  province: string;
  postalCode: string;
  city: string;
  country: string;
}
