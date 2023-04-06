import { IPagination } from '@axios/axiosTypes';
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
  PatientProfileOverview,
  ProfilePhotoStatus,
  SexAtBirth
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
  fullName: string;
  pronoun: string;
  identifier: string;
  subTitle: string;
  isIntakeComplete: boolean;
  isICFormComplete: boolean;
  cycleStatus?: string | boolean;
  avatar?: {
    imageURL: string;
    status: ProfilePhotoStatus;
  };
  sexAtBirth: SexAtBirth;
  dateOfBirth: string;
  GTPAETALS?: string;
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
  exists: boolean;
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
  exist: boolean;
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

export interface IPregnancy {
  id: string;
  type: string;
  details: IPregnancyDetails;
}

export interface IPregnancyDetails {
  year: string;
  type?: string;
  birthOutcome?: string;
  monthsToConceive?: string;
  location?: string;
}

export interface IPreviousPregnancies extends MedicalBackgroundFieldValues {
  value: boolean;
  id: string;
  pregnancies?: IPregnancy[];
}

export interface IFemalePregnancyInformationProps {
  previousPregnancies: IPreviousPregnancies;
  numberOfPregnancies: number;
}

export interface IFemalePregnancyInformation {
  GTPAETALS: IFemalePregnancyInformationProps;
}

export interface IMedicalBackgroundFieldValuesWithValue extends MedicalBackgroundFieldValues {
  value: string | boolean;
}

export interface IFemalePatientGynaecologicalHistoryFieldItem {
  id: string;
}

export interface IMedicalBackgroundFieldValuesWithItems extends MedicalBackgroundFieldValues {
  items: IFemalePatientGynaecologicalHistoryFieldItem[];
}

export interface ITakingBirthControl extends IMedicalBackgroundFieldValuesWithValue {}

export interface IIsOvulating extends IMedicalBackgroundFieldValuesWithValue {}

export interface IPreviousPapTest extends IMedicalBackgroundFieldValuesWithValue {}

export interface IPapTestLastDate extends IMedicalBackgroundFieldValuesWithValue {}

export interface IAbnormalPap extends IMedicalBackgroundFieldValuesWithValue {}

export interface IAbnormalPapProcedures extends IMedicalBackgroundFieldValuesWithItems {}

export interface IFemalePatientGynaecologicalHistoryProps {
  takingBirthControl: ITakingBirthControl;
  isOvulating: IIsOvulating;
  previousPapTest: IPreviousPapTest;
  papTestLastDate: IPapTestLastDate;
  abnormalPap: IAbnormalPap;
  abnormalPapProcedures: IMedicalBackgroundFieldValuesWithItems;
  gynaecologicalConditions: IMedicalBackgroundFieldValuesWithItems;
  signsOfPCOS: IMedicalBackgroundFieldValuesWithItems;
  hyperprolactinemia: IMedicalBackgroundFieldValuesWithItems;
  signsOfPOI: IMedicalBackgroundFieldValuesWithItems;
  breastfeeding: IMedicalBackgroundFieldValuesWithValue;
  cervixTreatment: IMedicalBackgroundFieldValuesWithValue;
  intercoursePain: IMedicalBackgroundFieldValuesWithValue;
}

export interface IPatientMedications extends IPagination {
  medications: MedicationsProps[];
}

export interface MedicationsProps {
  id: string;
  title: string;
  commonName?: string;
  dosage: string;
  route: string;
  frequency: string;
  time?: string;
  duration: {
    start: string;
    end: string;
  };
  prescriber?: string;
}
export interface IFemalePatientGynaecologicalHistory {
  gynaecologicalHistory: IFemalePatientGynaecologicalHistoryProps;
}

export interface IDrugsResponse {
  medications: IDrugsProps[];
}

export interface IDrugsProps {
  id: string;
  title: string;
  commonName?: string;
}
export interface IFemalePatientMenstrualCycleHistoryProps {
  hasPeriod: IMedicalBackgroundFieldValuesWithValue;
  cycleLength: IMedicalBackgroundFieldValuesWithValue;
  firstDayOfLastPeriod: IMedicalBackgroundFieldValuesWithValue;
  flow: IMedicalBackgroundFieldValuesWithValue;
  daysOfBleeding: IMedicalBackgroundFieldValuesWithValue;
  pain: IMedicalBackgroundFieldValuesWithValue;
  clots: IMedicalBackgroundFieldValuesWithValue;
  symptoms: IMedicalBackgroundFieldValuesWithValue;
}

export interface IFemalePatientMenstrualCycleHistory {
  menstrualHistory: IFemalePatientMenstrualCycleHistoryProps;
}

export enum DropdownOptionType {
  MonthsConceiving = 'MonthsConceiving',
  FertilityTreatmentCycles = 'FertilityTreatmentCycles',
  TypeOfPregnancy = 'TypeOfPregnancy',
  YearOfBirth = 'YearOfBirth',
  VOrCs = 'VOrCs',
  BirthOutcome = 'BirthOutcome',
  MonthsToConceive = 'MonthsToConceive',
  YearOfEctopic = 'YearOfEctopic',
  PregnancySide = 'PregnancySide',
  YearOfMiscarriage = 'YearOfMiscarriage',
  MenstrualFlow = 'MenstrualFlow',
  DaysOfBleeding = 'DaysOfBleeding',
  MenstrualPain = 'MenstrualPain',
  ProceduresDueToAbnormalPap = 'ProceduresDueToAbnormalPap',
  MissCarriagePregnancyTreatment = 'MissCarriagePregnancyTreatment',
  EctopicPregnancyTreatment = 'EctopicPregnancyTreatment',
  GynaecologicalConditions = 'GynaecologicalConditions',
  Hyperprolactinemia = 'Hyperprolactinemia',
  SignsOfPOI = 'SignsOfPOI',
  PrimaryPatientContributionMale = 'PrimaryPatientContributionMale',
  PrimaryPatientContributionFemale = 'PrimaryPatientContributionFemale',
  Province = 'Province',
  SignsOfPCOS = 'SignsOfPCOS',
  Pronouns = 'Pronouns',
  Gender = 'Gender',
  SexualOrientation = 'SexualOrientation',
  RelationshipStatus = 'RelationshipStatus',
  Relationship = 'Relationship',
  StressLevel = 'StressLevel',
  FamilyMember = 'FamilyMember',
  DiagnosedConditions = 'DiagnosedConditions',
  PrimaryPatientContribution = 'PrimaryPatientContribution',
  Route = 'Route',
  Refill = 'Refill'
}

export interface IDropdownOption {
  id: string;
  title: string;
}
export interface IDropdown {
  type: DropdownOptionType;
  options: IDropdownOption[];
}

export interface IDropdownsResponse {
  dropdowns: IDropdown[];
}

export enum Recency {
  Current = 'Current',
  Past = 'Past',
  Missing = 'Missing'
}
export enum TypeOfPregnancy {
  FullTerm = 'FullTerm',
  Preterm = 'Preterm',
  EctopicTubal = 'EctopicTubal',
  Miscarriage = 'Miscarriage',
  ElectiveTermination = 'ElectiveTermination'
}

export enum TypeOfPregnancyLabel {
  FullTerm = 'Full Term (T)',
  Preterm = 'Preterm (P)',
  EctopicTubal = 'Ectopic/Tubal (E)',
  Miscarriage = 'Miscarriage (A)',
  ElectiveTermination = 'Elective Termination (TA)'
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
  isSameAddressChecked?: boolean;
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

export interface IPatientBackgroundPartners {
  sexAtBirth: ISexAtBirth;
  cancerPatient: ICancerPatient;
  gender: IGender;
  sexualOrientation: ISexualOrientation;
  preferredPronouns: IPreferredPronouns;
  relationship: IRelationship;
  dateOfBirth: IDateOfBirth;
  age: IAge;
  currentOccupation: ICurrentOccupation;
  referringDoctor: IReferringDoctor;
  familyDoctor: IFamilyDoctor;
  pharmacy: IPharmacy;
}

export interface IPreviousConception extends MedicalBackgroundFieldValues {
  value: boolean;
}
export interface IHaveBiologicalChildren extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IBiologicalChildrenWithPartner extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IHadSemenAnalysis extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface ISemenAnalysisIsNormal extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IDiagnosedConditions extends MedicalBackgroundFieldValues {
  items: IDiagnosedConditionsItem[];
}

export interface IDiagnosedConditionsItem extends MedicalBackgroundFieldValues {
  id: string;
}

export interface IVasectomy extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IVasectomyReversal extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IErectionDifficulties extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IUndescendedTesticles extends MedicalBackgroundFieldValues {
  value: boolean;
}
export interface ITesticularIssues extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IToxins extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IInfections extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IGenitalSurgery extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IGenitourinaryHistoryRes extends MedicalBackgroundFieldValues {
  genitourinaryHistory: IGenitourinaryHistory;
}

export interface IGenitourinaryHistory {
  previousConception: IPreviousConception;
  haveBiologicalChildren: IHaveBiologicalChildren;
  biologicalChildrenWithPartner: IBiologicalChildrenWithPartner;
  hadSemenAnalysis: IHadSemenAnalysis;
  semenAnalysisIsNormal: ISemenAnalysisIsNormal;
  diagnosedConditions: IDiagnosedConditions;
  vasectomy: IVasectomy;
  vasectomyReversal: IVasectomyReversal;
  erectionDifficulties: IErectionDifficulties;
  undescendedTesticles: IUndescendedTesticles;
  testicularIssues: ITesticularIssues;
  toxins: IToxins;
  infections: IInfections;
  genitalSurgery: IGenitalSurgery;
}

export interface IPatientBackground {
  partners: IPatientBackgroundPartners;
}

export interface ISexAtBirth extends MedicalBackgroundFieldValues {
  value: string;
}

export interface ICancerPatient extends MedicalBackgroundFieldValues {
  value: boolean;
}

export interface IGender extends MedicalBackgroundFieldValues {
  value: string;
}

export interface ISexualOrientation extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IPreferredPronouns extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IRelationship extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IDateOfBirth extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IAge extends MedicalBackgroundFieldValues {
  value: string;
}

export interface ICurrentOccupation extends MedicalBackgroundFieldValues {
  value: string;
}

export interface IPharmacy extends MedicalBackgroundFieldValues {
  exists: boolean;
  name: string;
  address: IPharmacyAddress;
}

export interface IPharmacyAddress {
  street: string;
  unit?: string;
  city: string;
  country: string;
  postalCode: string;
  faxNumber?: string;
  phoneNumber?: string;
}

export interface IReferringDoctor extends MedicalBackgroundFieldValues {
  value: boolean;
  name: string;
}

export interface IFamilyDoctor extends MedicalBackgroundFieldValues {
  value: boolean;
  name: string;
}
