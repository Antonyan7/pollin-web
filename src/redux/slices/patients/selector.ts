import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selector = (state: RootState) => state.patients;

const patientsListData = createSelector(selector, (state) => state.patientsList);
const patientsList = createSelector([selector], (state) => state.patientsList.list);
const isPatientsListLoading = createSelector([selector], (state) => state.isPatientsListLoading);
const isPatientsFiltersLoading = createSelector([selector], (state) => state.isPatientsFiltersLoading);
const filtersList = createSelector([selector], (state) => state.patientsList.searchFilters);
const patientAlertDetails = createSelector([selector], (state) => state.patientsList.patientAlertDetails);
const encountersList = createSelector([selector], (state) => state.encounters.list);
const isPatientCustomAlertCreated = createSelector([selector], (state) => state.isPatientCustomAlertCreated);
const isEncountersListLoading = createSelector([selector], (state) => state.isEncountersListLoading);
const encountersTypes = createSelector([selector], (state) => state.encounters.types);
const recentAppointments = createSelector([selector], (state) => state.recentAppointments);
const isRecentAppointmentsLoading = createSelector([selector], (state) => state.isRecentAppointmentsLoading);
const isEncountersFiltersLoading = createSelector([selector], (state) => state.isEncountersFiltersLoading);
const isBookingRequestToPatientLoading = createSelector([selector], (state) => state.isBookingRequestToPatientLoading);
const encounterFilters = createSelector([selector], (state) => state.encounters.filters);
const currentPatientId = createSelector([selector], (state) => state.patientsList.currentPatientId);
const currentEncounterId = createSelector([selector], (state) => state.patientsList.currentEncounterId);
const encounterDetails = createSelector([selector], (state) => state.encounters.encounterDetails);
const encountersSearchValue = createSelector([selector], (state) => state.encountersSearchValue);
const selectedEncountersFilters = createSelector([selector], (state) => state.selectedEncountersFilters);
const isEncountersAddendumLoading = createSelector([selector], (state) => state.isEncountersAddendumLoading);
const patientProfile = createSelector([selector], (state) => state.patientProfile);
const isPatientHighlightsLoading = createSelector([selector], (state) => state.isPatientHighlightsLoading);
const patientHighlightHeader = createSelector([selector], (state) => state.patientHighlightHeader);
const patientHighlights = createSelector([selector], (state) => state.patientHighlights);
const isPatientHighlightIntakeComplete = createSelector([selector], (state) => state.isPatientHighlightIntakeComplete);
const isICFormComplete = createSelector([selector], (state) => state.isICFormComplete);
const isPatientAlertViewOpen = createSelector([selector], (state) => state.isPatientAlertViewOpen);
const isAlertDeleted = createSelector([selector], (state) => state.isAlertDeleted);
const isPatientHighlightIntakeReminderActive = createSelector(
  [selector],
  (state) => state.isPatientHighlightIntakeReminderActive
);
const isVerifyPatientProfilePhotoLoading = createSelector(
  [selector],
  (state) => state.isVerifyPatientProfilePhotoLoading
);
const latestTestResults = createSelector([selector], (state) => state.latestTestResults);
const patientProfileOverview = createSelector([selector], (state) => state.profile.overview);
const isPatientProfileOverviewLoading = createSelector([selector], (state) => state.profile.isOverviewLoading);
const testResultsHistory = createSelector([selector], (state) => state.profile.testResultsHistory);
const isTestResultsHistoryLoading = createSelector([selector], (state) => state.profile.isTestResultsHistoryLoading);
const profileTestResults = createSelector([selector], (state) => state.profile.profileTestResults);
const isProfileTestResultsLoading = createSelector([selector], (state) => state.profile.isProfileTestResultsLoading);
const profileTestResultDetails = createSelector([selector], (state) => state.profileTestResultDetails);
const isProfileTestResultDetailsLoading = createSelector(
  [selector],
  (state) => state.isProfileTestResultDetailsLoading
);
const patientAppointments = createSelector([selector], (state) => state.patientAppointments);
const isPatientAlertDetailsLoading = createSelector([selector], (state) => state.isPatientAlertDetailsLoading);
const isPatientAppointmentFiltersLoading = createSelector(
  [selector],
  (state) => state.isPatientAppointmentFiltersLoading
);
const isEncountersDetailsLoading = createSelector([selector], (state) => state.isEncountersDetailsLoading);
const currentPatientAppointmentFilterField = createSelector(
  [selector],
  (state) => state.currentPatientAppointmentFilterField
);
const isCreateEncounterNoteLoading = createSelector([selector], (state) => state.isCreateEncounterNoteLoading);
const isUpdateEncounterNoteLoading = createSelector([selector], (state) => state.isUpdateEncounterNoteLoading);
const isUpdateEncounterAddendumLoading = createSelector([selector], (state) => state.isUpdateEncounterAddendumLoading);
const isCreateEncounterAddendumLoading = createSelector([selector], (state) => state.isCreateEncounterAddendumLoading);
const patientContactInformation = createSelector([selector], (state) => state.contactInformation);
const isPatientContactInformationLoading = createSelector(
  [selector],
  (state) => state.isPatientContactInformationLoading
);
const patientBackgroundInformation = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientBackground.patientBackgroundInformation
);
const isPatientBackgroundInformationLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientBackground.isPatientBackgroundInformationLoading
);
const isUpdatePatientBackgroundInformationLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientBackground.isUpdatePatientBackgroundInformationLoading
);
const isPatientBackgroundEditButtonClicked = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientBackground.isPatientBackgroundEditButtonClicked
);

// ic-form
const icForm = createSelector([selector], (state) => state.icForm.form);
const isIcFormLoading = createSelector([selector], (state) => state.icForm.isGetIcFormLoading);
const icFormCompletedOn = createSelector([selector], (state) => state.icForm.completedOn);

const isPatientProfileLoading = createSelector([selector], (state) => state.isPatientProfileLoading);
const isGeneralHealthLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isGeneralHealthLoading
);
const isContactInformationLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isContactInformationLoading
);
const isContactInformationDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isContactInformationDataUpdating
);
const generalHealth = createSelector([selector], (state) => state.medicalBackground.contact.generalHealth);
const contactInformation = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientContactInformation
);
const isGeneralHealthEditButtonClicked = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isGeneralHealthEditButtonClicked
);
const isContactInformationButtonClicked = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isContactInformationEditButtonClicked
);
const isGeneralHealthDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.isGeneralHealthDataUpdating
);
const manuallyAddressForPrimary = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.manuallyAddressForPrimary
);

const manualAddressForPharmacy = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.patientBackground.manualAddressForPharmacy
);

const manuallyAddressForMailing = createSelector(
  [selector],
  (state) => state.medicalBackground.contact.manuallyAddressForMailing
);
/* Medications Prescriptions */
const drugs = createSelector([selector], (state) => state.medicationsPrescriptions.medications.drugs);
const isDrugLoading = createSelector([selector], (state) => state.medicationsPrescriptions.medications.isDrugLoading);
const isDropdownOptionsLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isDropdownOptionsLoading
);
const patientCurrentMedications = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.patientCurrentMedications
);
const isMedicationFieldsDirty = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isMedicationFieldsDirty
);

const patientPastMedications = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.patientPastMedications
);
const patientMissingMedications = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.patientMissingMedications
);
const isPatientPastMedicationLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isPatientPastMedicationLoading
);
const isDownloadPrescriptionLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.isDownloadPrescriptionLoading
);
const isPatientCurrentMedicationLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isPatientCurrentMedicationLoading
);
const patientMedicationState = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.patientMedicationState
);
const dropdownOptions = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.dropdownOptions
);
const patientPrescriptions = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.patientPrescriptions
);
const prescriptionStatuses = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.prescriptionStatuses
);
const isPatientPrescriptionsLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.isPatientPrescriptionsLoading
);

const isMedicationCreatedLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isMedicationCreatedLoading
);
const isMedicationUpdatedLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isMedicationUpdatedLoading
);
const isCardInEditMode = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isCardInEditMode
);
const isCardInViewMode = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isCardInViewMode
);

const prescriptionsDrugList = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.prescriptionsDrugList
);
const currentPrescriptionUuid = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.currentPrescriptionUuid
);
const isPrescriptionCreationLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.prescriptions.isPrescriptionCreationLoading
);

const medicationCategories = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.medicationCategories
);
const isMedicationCategoriesLoading = createSelector(
  [selector],
  (state) => state.medicationsPrescriptions.medications.isMedicationCategoriesLoading
);

/* Medical History */
const fertilityHistory = createSelector([selector], (state) => state.medicalBackground.medicalHistory.fertilityHistory);
const isFertilityHistoryDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFertilityHistoryDataUpdating
);
const isFertilityHistoryLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFertilityHistoryLoading
);
const femalePregnancyInformation = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.femalePregnancyInformation
);
const isFemalePregnancyInformationDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePregnancyInformationDataUpdating
);
const isFemalePregnancyInformationLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePregnancyInformationLoading
);

const femalePatientGynaecologicalHistory = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.femalePatientGynaecologicalHistory
);
const isFemalePatientGynaecologicalHistoryDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePatientGynaecologicalHistoryDataUpdating
);
const isFemalePatientGynaecologicalHistoryLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePatientGynaecologicalHistoryLoading
);

const isMalePatientGenitourinaryHistoryLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isMalePatientGenitourinaryHistoryLoading
);

const malePatientGenitourinaryHistory = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.malePatientGenitourinaryHistory
);
const isMalePatientGenitourinaryEditButtonClicked = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isMalePatientGenitourinaryEditButtonClicked
);
const femalePatientMenstrualCycleHistory = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.femalePatientMenstrualCycleHistory
);
const isFemalePatientMenstrualCycleHistoryDataUpdating = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePatientMenstrualCycleHistoryDataUpdating
);
const isFemalePatientMenstrualCycleHistoryLoading = createSelector(
  [selector],
  (state) => state.medicalBackground.medicalHistory.isFemalePatientMenstrualCycleHistoryLoading
);

const dropdowns = createSelector([selector], (state) => state.medicalBackground.common.dropdowns);

const isDropdownsLoading = createSelector([selector], (state) => state.medicalBackground.common.isDropdownsLoading);

export default {
  isTestResultsHistoryLoading,
  isProfileTestResultsLoading,
  patientsListData,
  patientsList,
  isPatientsFiltersLoading,
  isPatientsListLoading,
  isPatientProfileLoading,
  filtersList,
  patientAlertDetails,
  isPatientCustomAlertCreated,
  isPatientAlertViewOpen,
  isAlertDeleted,
  encountersList,
  encounterFilters,
  isEncountersListLoading,
  recentAppointments,
  isRecentAppointmentsLoading,
  encountersTypes,
  encountersSearchValue,
  selectedEncountersFilters,
  currentPatientId,
  patientProfile,
  isPatientHighlightsDetailsLoading: isPatientHighlightsLoading,
  isContactInformationDataUpdating,
  patientHighlightHeader,
  patientHighlights,
  encounterDetails,
  isEncountersAddendumLoading,
  isEncountersFiltersLoading,
  currentEncounterId,
  latestTestResults,
  isPatientProfileOverviewLoading,
  patientProfileOverview,
  testResultsHistory,
  patientAppointments,
  isPatientAppointmentFiltersLoading,
  isEncountersDetailsLoading,
  profileTestResults,
  profileTestResultDetails,
  isProfileTestResultDetailsLoading,
  currentPatientAppointmentFilterField,
  isCreateEncounterNoteLoading,
  isUpdateEncounterNoteLoading,
  isUpdateEncounterAddendumLoading,
  isCreateEncounterAddendumLoading,
  patientContactInformation,
  isPatientContactInformationLoading,
  isPatientHighlightIntakeComplete,
  isICFormComplete,
  isPatientHighlightIntakeReminderActive,
  isPatientAlertDetailsLoading,
  drugs,
  isDropdownOptionsLoading,
  isDownloadPrescriptionLoading,
  patientCurrentMedications,
  isMalePatientGenitourinaryHistoryLoading,
  malePatientGenitourinaryHistory,
  patientPastMedications,
  patientMissingMedications,
  isPatientCurrentMedicationLoading,
  isPatientPastMedicationLoading,
  patientPrescriptions,
  prescriptionStatuses,
  isPatientPrescriptionsLoading,
  isMedicationCreatedLoading,
  isMedicationUpdatedLoading,
  isCardInEditMode,
  isCardInViewMode,
  prescriptionsDrugList,
  patientMedicationState,
  currentPrescriptionUuid,
  isPrescriptionCreationLoading,
  dropdownOptions,
  isDrugLoading,
  icForm,
  isIcFormLoading,
  icFormCompletedOn,
  isGeneralHealthLoading,
  generalHealth,
  isGeneralHealthEditButtonClicked,
  isGeneralHealthDataUpdating,
  fertilityHistory,
  isFertilityHistoryDataUpdating,
  isFertilityHistoryLoading,
  femalePatientMenstrualCycleHistory,
  isFemalePatientMenstrualCycleHistoryDataUpdating,
  isFemalePatientMenstrualCycleHistoryLoading,
  femalePatientGynaecologicalHistory,
  isFemalePatientGynaecologicalHistoryDataUpdating,
  isFemalePatientGynaecologicalHistoryLoading,
  dropdowns,
  isMedicationFieldsDirty,
  isDropdownsLoading,
  femalePregnancyInformation,
  isVerifyPatientProfilePhotoLoading,
  isFemalePregnancyInformationDataUpdating,
  isFemalePregnancyInformationLoading,
  isContactInformationButtonClicked,
  isContactInformationLoading,
  patientBackgroundInformation,
  isPatientBackgroundInformationLoading,
  isUpdatePatientBackgroundInformationLoading,
  isPatientBackgroundEditButtonClicked,
  isMalePatientGenitourinaryEditButtonClicked,
  contactInformation,
  manuallyAddressForMailing,
  manuallyAddressForPrimary,
  isBookingRequestToPatientLoading,
  manualAddressForPharmacy,
  medicationCategories,
  isMedicationCategoriesLoading
};
