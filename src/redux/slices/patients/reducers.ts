import { IPatientRecentAppointment } from '@axios/booking/managerBookingTypes';
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
  IPatientICFormProps,
  IPatientMedications,
  IPatientMedicationsState,
  IPatientPrescriptions,
  IPrescriptionStatusesVariations,
  IProfileTestResults,
  ITestResultHistory,
  PatientPrescriptionsDrugListProps,
  ProfileTestResultDetailsItem
} from '@axios/patientEmr/managerPatientEmrTypes';
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { IEncountersFilterOption } from 'types/patient';
import {
  AlertDetailsProps,
  IEncounterFilterProps,
  IEncounterList,
  IEncounterType,
  IFilterCategory,
  IPatientAppointmentsList,
  IPatientAppointmentsProps,
  IPatientList,
  ITestResultLatest,
  PatientEmrProps,
  PatientHighlight,
  PatientHighlightHeader,
  PatientProfile,
  PatientProfileOverview
} from 'types/reduxTypes/patient-emrStateTypes';

const createReducer = <T extends SliceCaseReducers<PatientEmrProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setPatientsList(state, action: IAction<IPatientList>) {
    state.patientsList.list = action.payload;
  },
  setPatientSearchFilters(state, action: IAction<IFilterCategory[]>) {
    state.patientsList.searchFilters = action.payload;
  },
  setPatientAlertDetails(state, action: IAction<AlertDetailsProps[]>) {
    state.patientsList.patientAlertDetails = action.payload;
  },
  setCurrentPatientId(state, action: IAction<string>) {
    state.patientsList.currentPatientId = action.payload;
  },
  setCurrentEncounterID(state, action: IAction<string>) {
    state.patientsList.currentEncounterId = action.payload;
  },
  setPatientsLoadingState(state, action: IAction<boolean>) {
    state.isPatientsListLoading = action.payload;
  },
  setPatientsFiltersLoadingState(state, action: IAction<boolean>) {
    state.isPatientsFiltersLoading = action.payload;
  },
  setEncountersLoadingState(state, action: IAction<boolean>) {
    state.isEncountersListLoading = action.payload;
  },
  setEncountersSearchValue(state, action: IAction<string>) {
    state.encountersSearchValue = action.payload;
  },
  setEncountersSelectedFilters(state, action: IAction<IEncountersFilterOption[]>) {
    state.selectedEncountersFilters = action.payload;
  },
  setEncountersFiltersLoadingState(state, action: IAction<boolean>) {
    state.isEncountersFiltersLoading = action.payload;
  },
  setEncountersAddendumLoadingState(state, action: IAction<boolean>) {
    state.isEncountersAddendumLoading = action.payload;
  },
  setPatientAlertViewState(state, action: IAction<boolean>) {
    state.isPatientAlertViewOpen = action.payload;
  },
  setEncountersList(state, action: IAction<IEncounterList>) {
    state.encounters.list = action.payload;
  },
  setEncounterFilters(state, action: IAction<IEncounterFilterProps[]>) {
    state.encounters.filters = action.payload;
  },
  setEncountersType(state, action: IAction<IEncounterType[]>) {
    state.encounters.types = action.payload;
  },
  setEncounterDetailsInfo(state, action: IAction<IEncounterDetailsProps | null>) {
    state.encounters.encounterDetails = action.payload;
  },
  setRecentAppointments(state, action: IAction<IPatientRecentAppointment[]>) {
    state.recentAppointments = action.payload;
  },
  setIsRecentAppointmentsLoading(state, action: IAction<boolean>) {
    state.isRecentAppointmentsLoading = action.payload;
  },
  setIsPatientCustomAlertCreated(state, action: IAction<boolean>) {
    state.isPatientCustomAlertCreated = action.payload;
  },
  setIsAlertDeleted(state, action: IAction<boolean>) {
    state.isAlertDeleted = action.payload;
  },
  setIsVerifyPatientProfilePhotoLoading(state, action: IAction<boolean>) {
    state.isVerifyPatientProfilePhotoLoading = action.payload;
  },
  setPatientProfile(state, action: IAction<PatientProfile | null>) {
    state.patientProfile = action.payload;
  },
  setIsPatientProfileLoading(state, action: IAction<boolean>) {
    state.isPatientProfileLoading = action.payload;
  },
  setPatientHighlightsLoadingState(state, action: IAction<boolean>) {
    state.isPatientHighlightsLoading = action.payload;
  },
  setPatientHighlightHeader(state, action: IAction<PatientHighlightHeader>) {
    state.patientHighlightHeader = action.payload;
  },
  setPatientHighlights(state, action: IAction<PatientHighlight[]>) {
    state.patientHighlights = action.payload;
  },
  setPatientProfileOverview(state, action: IAction<PatientProfileOverview>) {
    state.profile.overview = action.payload;
  },
  setIsPatientProfileOverviewLoading(state, action: IAction<boolean>) {
    state.profile.isOverviewLoading = action.payload;
  },
  setPatientAlertDetailsLoading(state, action: IAction<boolean>) {
    state.isPatientAlertDetailsLoading = action.payload;
  },
  setTestResultsHistory(state, action: IAction<ITestResultHistory | null>) {
    state.profile.testResultsHistory = action.payload;
  },
  setIsTestResultsHistoryLoading(state, action: IAction<boolean>) {
    state.profile.isTestResultsHistoryLoading = action.payload;
  },
  setProfileTestResults(state, action: IAction<IProfileTestResults>) {
    state.profile.profileTestResults = action.payload;
  },
  setProfileTestResultDetails(state, action: IAction<ProfileTestResultDetailsItem[]>) {
    state.profileTestResultDetails = action.payload;
  },
  setIsProfileTestResultsLoading(state, action: IAction<boolean>) {
    state.profile.isProfileTestResultsLoading = action.payload;
  },
  setIsProfileTestResultDetailsLoading(state, action: IAction<boolean>) {
    state.isProfileTestResultDetailsLoading = action.payload;
  },
  setLatestTestResults(state, action: IAction<ITestResultLatest[]>) {
    state.latestTestResults = action.payload;
  },
  setPatientAppointments(state, action: IAction<Partial<IPatientAppointmentsProps>>) {
    state.patientAppointments = {
      ...state.patientAppointments,
      ...action.payload
    };
  },
  setPatientAppointmentsList(state, action: IAction<IPatientAppointmentsList>) {
    state.patientAppointments.list = action.payload;
  },
  setPatientAppointmentsOrderBy(state, action: IAction<IPatientAppointmentsProps['orderBy']>) {
    state.patientAppointments.orderBy = action.payload;
  },
  setPatientAppointmentsOrder(state, action: IAction<IPatientAppointmentsProps['order']>) {
    state.patientAppointments.order = action.payload;
  },
  setPatientAppointmentsRequestStatus(state, action: IAction<IPatientAppointmentsProps['status']>) {
    state.patientAppointments.status = action.payload;
  },
  setPatientAppointmentsFilters(state, action: IAction<IPatientAppointmentsProps['filters']>) {
    state.patientAppointments.filters = action.payload;
  },
  setPatientAppointmentsFiltersLoading(state, action: IAction<boolean>) {
    state.isPatientAppointmentFiltersLoading = action.payload;
  },
  setPatientAppointmentsSelectedFilters(state, action: IAction<IPatientAppointmentsProps['selectedFilters']>) {
    state.patientAppointments.selectedFilters = action.payload;
  },
  setPatientAppointmentsListPage(state, action: IAction<IPatientAppointmentsList['currentPage']>) {
    state.patientAppointments.list.currentPage = action.payload;
  },
  setEncountersDetailsLoadingState(state, action: IAction<boolean>) {
    state.isEncountersDetailsLoading = action.payload;
  },
  setCurrentAppointmentFilterType(state, action: IAction<string>) {
    state.currentPatientAppointmentFilterField = action.payload;
  },
  setCreateEncounterNoteLoadingState(state, action: IAction<boolean>) {
    state.isCreateEncounterNoteLoading = action.payload;
  },
  setUpdateEncounterNoteLoadingState(state, action: IAction<boolean>) {
    state.isUpdateEncounterNoteLoading = action.payload;
  },
  setUpdateEncounterAddendumLoadingState(state, action: IAction<boolean>) {
    state.isUpdateEncounterAddendumLoading = action.payload;
  },
  setCreateEncounterAddendumLoadingState(state, action: IAction<boolean>) {
    state.isCreateEncounterAddendumLoading = action.payload;
  },
  setPatientContactInformation(state, action: IAction<IPatientContactInformation>) {
    state.contactInformation = action.payload;
  },
  setPatientContactInformationLoadingState(state, action: IAction<boolean>) {
    state.isPatientContactInformationLoading = action.payload;
  },
  setIsPatientHighlightIntakeComplete(state, action: IAction<boolean>) {
    state.isPatientHighlightIntakeComplete = action.payload;
  },
  setIsICFormComplete(state, action: IAction<boolean>) {
    state.isICFormComplete = action.payload;
  },
  setIsPatientHighlightIntakeReminderActive(state, action: IAction<boolean>) {
    state.isPatientHighlightIntakeReminderActive = action.payload;
  },
  setPatientIcForm(state, action: IAction<IPatientICFormProps | null>) {
    state.icForm.form = action.payload;
  },
  setPatientIcFormCompletedDate(state, action: IAction<string>) {
    state.icForm.completedOn = action.payload;
  },
  setIsGetPatientIcFormLoading(state, action: IAction<boolean>) {
    state.icForm.isGetIcFormLoading = action.payload;
  },
  setGeneralHealth(state, action: IAction<IGeneralHealthProps>) {
    state.medicalBackground.contact.generalHealth = action.payload;
  },
  setIsGeneralHealthLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isGeneralHealthLoading = action.payload;
  },
  setIsEditButtonClicked(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isGeneralHealthEditButtonClicked = action.payload;
  },
  setIsGeneralHealthDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isGeneralHealthDataUpdating = action.payload;
  },
  setFertilityHistory(state, action: IAction<IFertilityHistoryProps | null>) {
    state.medicalBackground.medicalHistory.fertilityHistory = action.payload;
  },
  setIsFertilityHistoryLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFertilityHistoryLoading = action.payload;
  },
  setIsFertilityHistoryDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFertilityHistoryDataUpdating = action.payload;
  },
  setFemalePregnancyInformation(state, action: IAction<IFemalePregnancyInformationProps | null>) {
    state.medicalBackground.medicalHistory.femalePregnancyInformation = action.payload;
  },
  setIsFemalePregnancyInformationLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePregnancyInformationLoading = action.payload;
  },
  setIsFemalePregnancyInformationDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePregnancyInformationDataUpdating = action.payload;
  },
  setFemalePatientMenstrualCycleHistory(state, action: IAction<IFemalePatientMenstrualCycleHistoryProps | null>) {
    state.medicalBackground.medicalHistory.femalePatientMenstrualCycleHistory = action.payload;
  },
  setIsFemalePatientMenstrualCycleHistoryLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientMenstrualCycleHistoryLoading = action.payload;
  },
  setIsFemalePatientMenstrualCycleHistoryDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientMenstrualCycleHistoryDataUpdating = action.payload;
  },
  setFemalePatientGynaecologicalHistory(state, action: IAction<IFemalePatientGynaecologicalHistoryProps | null>) {
    state.medicalBackground.medicalHistory.femalePatientGynaecologicalHistory = action.payload;
  },
  setIsFemalePatientGynaecologicalHistoryLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientGynaecologicalHistoryLoading = action.payload;
  },
  setIsFemalePatientGynaecologicalHistoryDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientGynaecologicalHistoryDataUpdating = action.payload;
  },
  setIsMalePatientGenitourinaryHistoryLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isMalePatientGenitourinaryHistoryLoading = action.payload;
  },
  setMalePatientGynaecologicalHistory(state, action: IAction<IGenitourinaryHistory | null>) {
    state.medicalBackground.medicalHistory.malePatientGenitourinaryHistory = action.payload;
  },
  setDropdowns(state, action: IAction<IDropdown[]>) {
    state.medicalBackground.common.dropdowns = action.payload;
  },
  setIsDropdownsLoading(state, action: IAction<boolean>) {
    state.medicalBackground.common.isDropdownsLoading = action.payload;
  },
  setMedicalPatientContactInformation(state, action: IAction<IPatientContactInformationProps>) {
    state.medicalBackground.contact.patientContactInformation = action.payload;
  },
  setIsMedicalPatientContactInformationLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isContactInformationLoading = action.payload;
  },
  setIsContactInformationEditButtonClicked(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isContactInformationEditButtonClicked = action.payload;
  },
  setIsPatientBackgroundEditButtonClicked(state, action: IAction<boolean>) {
    state.medicalBackground.contact.patientBackground.isPatientBackgroundEditButtonClicked = action.payload;
  },
  setManuallyAddressForPharmacy(state, action: IAction<AddManuallyAddressModalProps>) {
    state.medicalBackground.contact.patientBackground.manualAddressForPharmacy = action.payload;
  },
  setBackgroundInformation(state, action: IAction<IPatientBackgroundPartners>) {
    state.medicalBackground.contact.patientBackground.patientBackgroundInformation = action.payload;
  },
  setIsPatientBackgroundInformationLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.patientBackground.isPatientBackgroundInformationLoading = action.payload;
  },
  setIsUpdatePatientBackgroundInformationLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.patientBackground.isUpdatePatientBackgroundInformationLoading = action.payload;
  },
  setManuallyAddressForPrimary(state, action: IAction<AddManuallyAddressModalProps>) {
    state.medicalBackground.contact.manuallyAddressForPrimary = action.payload;
  },
  setManuallyAddressForMailing(state, action: IAction<AddManuallyAddressModalProps>) {
    state.medicalBackground.contact.manuallyAddressForMailing = action.payload;
  },
  setPatientMedicationsState(state, action: IAction<IPatientMedicationsState>) {
    state.medicationsPrescriptions.medications.patientMedicationState = action.payload;
  },
  setPatientCurrentMedications(state, action: IAction<IPatientMedications>) {
    state.medicationsPrescriptions.medications.patientCurrentMedications = action.payload;
  },
  setPatientPastMedications(state, action: IAction<IPatientMedications>) {
    state.medicationsPrescriptions.medications.patientPastMedications = action.payload;
  },
  setPatientMissingMedications(state, action: IAction<IPatientMedications>) {
    state.medicationsPrescriptions.medications.patientMissingMedications = action.payload;
  },
  setIsPatientPastMedicationLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isPatientPastMedicationLoading = action.payload;
  },
  setPatientPrescriptions(state, action: IAction<IPatientPrescriptions>) {
    state.medicationsPrescriptions.prescriptions.patientPrescriptions = action.payload;
  },
  setPrescriptionStatuses(state, action: IAction<IPrescriptionStatusesVariations[]>) {
    state.medicationsPrescriptions.prescriptions.prescriptionStatuses = action.payload;
  },
  setIsPatientPrescriptionsLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.prescriptions.isPatientPrescriptionsLoading = action.payload;
  },
  setIsPatientCurrentMedicationLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isPatientCurrentMedicationLoading = action.payload;
  },
  setIsContactInformationUpdateLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isContactInformationDataUpdating = action.payload;
  },
  setIsEditMalePatientGenitourinaryState(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isMalePatientGenitourinaryEditButtonClicked = action.payload;
  },
  setDrugs(state, action: IAction<IDrugsProps[]>) {
    state.medicationsPrescriptions.medications.drugs = action.payload;
  },
  setIsDrugLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isDrugLoading = action.payload;
  },
  setIsDropdownOptionsLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isDropdownOptionsLoading = action.payload;
  },
  setDropdownOptions(state, action: IAction<IDropdown[]>) {
    state.medicationsPrescriptions.medications.dropdownOptions = action.payload;
  },
  setIsPrescriptionCreationLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.prescriptions.isPrescriptionCreationLoading = action.payload;
  },
  setCurrentPrescriptionUuid(state, action: IAction<string>) {
    state.medicationsPrescriptions.prescriptions.currentPrescriptionUuid = action.payload;
  },
  setIsMedicationCreatedLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isMedicationCreatedLoading = action.payload;
  },
  setIsMedicationUpdatedLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.medications.isMedicationUpdatedLoading = action.payload;
  },
  setCardToEditMode(state, action: IAction<boolean[]>) {
    state.medicationsPrescriptions.medications.isCardInEditMode = action.payload;
  },
  setCardToViewMode(state, action: IAction<boolean[]>) {
    state.medicationsPrescriptions.medications.isCardInViewMode = action.payload;
  },
  setPatientPrescriptionsListItems(state, action: IAction<PatientPrescriptionsDrugListProps[] | null>) {
    state.medicationsPrescriptions.prescriptions.prescriptionsDrugList = action.payload;
  },
  setIsDownloadPrescriptionLoading(state, action: IAction<boolean>) {
    state.medicationsPrescriptions.prescriptions.isDownloadPrescriptionLoading = action.payload;
  },
  setIsBookingRequestToPatientLoading(state, action: IAction<boolean>) {
    state.isBookingRequestToPatientLoading = action.payload;
  }
});

export default reducers;
