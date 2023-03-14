import { IPatientRecentAppointment } from '@axios/booking/managerBookingTypes';
import {
  AddManuallyAddressModalProps,
  IDropdown,
  IEncounterDetailsProps,
  IFemalePatientGynecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryProps,
  IFemalePregnancyInformationProps,
  IFertilityHistoryProps,
  IGeneralHealthProps,
  IPatientContactInformation,
  IProfileTestResults,
  ITestResultHistory,
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

import { IPatientContactInformationProps } from '../../../manager/patientEmr/managerPatientEmrTypes';

const createReducer = <T extends SliceCaseReducers<PatientEmrProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
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
    state.setIsVerifyPatientProfilePhotoLoading = action.payload;
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
  setIsPatientHighlightIntakeReminderActive(state, action: IAction<boolean>) {
    state.isPatientHighlightIntakeReminderActive = action.payload;
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
  setFemalePatientGynecologicalHistory(state, action: IAction<IFemalePatientGynecologicalHistoryProps | null>) {
    state.medicalBackground.medicalHistory.femalePatientGynecologicalHistory = action.payload;
  },
  setIsFemalePatientGynecologicalHistoryLoading(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientGynecologicalHistoryLoading = action.payload;
  },
  setIsFemalePatientGynecologicalHistoryDataUpdating(state, action: IAction<boolean>) {
    state.medicalBackground.medicalHistory.isFemalePatientGynecologicalHistoryDataUpdating = action.payload;
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
  setManuallyAddressForPrimary(state, action: IAction<AddManuallyAddressModalProps>) {
    state.medicalBackground.contact.manuallyAddressForPrimary = action.payload;
  },
  setManuallyAddressForMailing(state, action: IAction<AddManuallyAddressModalProps>) {
    state.medicalBackground.contact.manuallyAddressForMailing = action.payload;
  },
  setIsContactInformationUpdateLoading(state, action: IAction<boolean>) {
    state.medicalBackground.contact.isContactInformationDataUpdating = action.payload;
  }
});

export default reducers;
