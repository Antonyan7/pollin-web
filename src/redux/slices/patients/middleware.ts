import API from '@axios/API';
import bookingHelpers from '@axios/booking/bookingHelpers';
import { IPatientAppointment, PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import {
  AddManuallyAddressModalProps,
  ICreateEncounterAddendumRequest,
  ICreatePatientPrescription,
  IFemalePatientGynaecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistoryProps,
  IFemalePregnancyInformationProps,
  IFertilityHistory,
  IGeneralHealthProps,
  IGenitourinaryHistory,
  IPatientBackgroundPartners,
  IPatientContactInformationProps,
  IPlanMutation,
  IUpdateEncounterAddendumRequest,
  PatientPrescriptionsDrugListProps,
  Recency,
  TestResultItemType
} from '@axios/patientEmr/managerPatientEmrTypes';
import { ISendBookingRequestToPatientRequest } from '@components/Modals/Booking/SendBookingRequestToPatientModal/types';
import { SeveritiesType } from '@components/Scheduling/types';
import { patientsMiddleware } from '@redux/slices/patients/index';
import { viewsMiddleware } from '@redux/slices/views';
import * as Sentry from '@sentry/nextjs';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { t } from 'i18next';
import { sortOrderTransformer } from 'redux/data-transformers/sortOrderTransformer';
import { AppDispatch, RootState } from 'redux/store';
import { ModalName } from 'types/modals';
import { CustomAlerts, IEncountersFilterOption, IEncountersReqBody, IPatientsReqBody, SortOrder } from 'types/patient';
import {
  AppointmentResponseStatus,
  GroupedFiltersOption,
  ICreateEncounterNoteProps,
  ICreateMedication,
  IEncounterList,
  IPatientList,
  IUpdateEncounterNoteProps,
  IUpdateMedication
} from 'types/reduxTypes/patient-emrStateTypes';

import slice from './slice';

const {
  setPatientsList,
  setPatientSearchFilters,
  setPatientAlertDetails,
  setCurrentPatientId,
  setEncountersSearchValue,
  setEncountersSelectedFilters,
  setPatientsLoadingState,
  setPatientsFiltersLoadingState,
  setPatientProfileOverview,
  setIsPatientProfileOverviewLoading,
  setEncountersLoadingState,
  setEncountersList,
  setEncounterFilters,
  setEncountersType,
  setEncounterDetailsInfo,
  setRecentAppointments,
  setIsVerifyPatientProfilePhotoLoading,
  setIsMalePatientGenitourinaryHistoryLoading,
  setIsRecentAppointmentsLoading,
  setPatientProfile,
  setIsPatientProfileLoading,
  setPatientHighlightsLoadingState,
  setPatientHighlightHeader,
  setPatientHighlights,
  setEncountersFiltersLoadingState,
  setCurrentEncounterID,
  setLatestTestResults,
  setTestResultsHistory,
  setProfileTestResults,
  setPatientAppointments,
  setEncountersDetailsLoadingState,
  setIsProfileTestResultsLoading,
  setIsPatientBackgroundInformationLoading,
  setBackgroundInformation,
  setIsTestResultsHistoryLoading,
  setCurrentAppointmentFilterType,
  setCreateEncounterNoteLoadingState,
  setUpdateEncounterNoteLoadingState,
  setUpdateEncounterAddendumLoadingState,
  setCreateEncounterAddendumLoadingState,
  setPatientContactInformation,
  setPatientContactInformationLoadingState,
  setIsPatientHighlightIntakeComplete,
  setIsICFormComplete,
  setIsPatientHighlightIntakeReminderActive,
  setPatientAppointmentsRequestStatus,
  setPatientAlertViewState,
  setIsEditMalePatientGenitourinaryState,
  setPatientAlertDetailsLoading,
  setIsPatientCustomAlertCreated,
  setIsAlertDeleted,
  setGeneralHealth,
  setIsGeneralHealthLoading,
  setIsEditButtonClicked,
  setIsGeneralHealthDataUpdating,
  setIsProfileTestResultDetailsLoading,
  setProfileTestResultDetails,
  setFertilityHistory,
  setIsPrescriptionCreationLoading,
  setCurrentPrescriptionUuid,
  setIsFertilityHistoryLoading,
  setFemalePregnancyInformation,
  setIsFemalePregnancyInformationLoading,
  setFemalePatientGynaecologicalHistory,
  setIsFemalePatientGynaecologicalHistoryLoading,
  setFemalePatientMenstrualCycleHistory,
  setIsFemalePatientMenstrualCycleHistoryLoading,
  setDropdowns,
  setIsDropdownsLoading,
  setMedicalPatientContactInformation,
  setIsMedicalPatientContactInformationLoading,
  setMalePatientGynaecologicalHistory,
  setIsPatientBackgroundEditButtonClicked,
  setIsContactInformationEditButtonClicked,
  setManuallyAddressForMailing,
  setManuallyAddressForPrimary,
  setIsContactInformationUpdateLoading,
  setIsFertilityHistoryDataUpdating,
  setIsFemalePregnancyInformationDataUpdating,
  setIsFemalePatientMenstrualCycleHistoryDataUpdating,
  setPatientCurrentMedications,
  setPatientPastMedications,
  setPatientMissingMedications,
  setIsPatientCurrentMedicationLoading,
  setIsPatientPastMedicationLoading,
  setPatientMedicationsState,
  setIsUpdatePatientBackgroundInformationLoading,
  setIsFemalePatientGynaecologicalHistoryDataUpdating,
  setDrugs,
  setPatientPrescriptionsListItems,
  setPatientPrescriptions,
  setIsPatientPrescriptionsLoading,
  setPrescriptionStatuses,
  setIsDrugLoading,
  setIsDropdownOptionsLoading,
  setDropdownOptions,
  setIsMedicationCreatedLoading,
  setIsMedicationUpdatedLoading,
  setCardToEditMode,
  setPlansList,
  setIsPlansListLoading,
  setStatusVariations,
  setIsStatusVariationsLoading,
  setCategories,
  setIsCategoriesLoading,
  setIsBookingRequestToPatientLoading
} = slice.actions;

const cleanPatientList = () => async (dispatch: AppDispatch) => {
  dispatch(
    setPatientsList({
      patients: [],
      currentPage: 0,
      totalItems: 0,
      pageSize: 0
    })
  );
  dispatch(setPatientsLoadingState(false));
};

const cleanEncountersList = () => (dispatch: AppDispatch) => {
  dispatch(
    setEncountersList({
      encounters: [],
      currentPage: 0,
      totalItems: 0,
      pageSize: 0
    })
  );
  dispatch(setEncountersLoadingState(false));
};

const isPatientAlertViewOpen = (alertViewState: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setPatientAlertViewState(alertViewState));
};

const getPatientsList = (patientsListData: IPatientsReqBody) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsLoadingState(true));

    const response = await API.patients.getPatientsList(sortOrderTransformer(patientsListData) as IPatientsReqBody);
    const data: IPatientList = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      patients: response.data.data.patients
    };

    dispatch(setPatientsList(data));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(cleanPatientList());
  } finally {
    dispatch(setPatientsLoadingState(false));
  }
};

const getPatientSearchFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientsFiltersLoadingState(true));

    const response = await API.patients.getPatientSearchFilters();

    dispatch(setPatientSearchFilters(response.data.data.filters));
    dispatch(setPatientsFiltersLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setPatientsFiltersLoadingState(false));
  }
};

const getPatientAlertDetails = (patientId: string, abortSignal?: AbortSignal) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setPatientAlertDetailsLoading(true));

    const response = await API.patients.getPatientAlertDetails(patientId, abortSignal);

    dispatch(setPatientAlertDetails(response.data.data.alerts ?? []));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setPatientAlertDetailsLoading(false));
  }
};

const createPatientAlert = (patientId: string, alert: CustomAlerts) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientCustomAlertCreated(true));

    await API.patients.createPatientAlert(patientId, alert);

    dispatch(getPatientAlertDetails(patientId));
    dispatch(patientsMiddleware.isPatientAlertViewOpen(true));
  } catch (error) {
    dispatch(setPatientAlertDetails([]));
  } finally {
    dispatch(setIsPatientCustomAlertCreated(false));
  }
};

const editPatientAlert = (patientId: string, alert: CustomAlerts) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientCustomAlertCreated(true));

    const response = await API.patients.editPatientAlert(patientId, alert);

    dispatch(setPatientAlertDetails(response.data.data.alerts ?? []));
  } catch (error) {
    dispatch(setPatientAlertDetails([]));
  } finally {
    dispatch(setIsPatientCustomAlertCreated(false));
  }
};

const deletePatientAlert = (alertId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsAlertDeleted(true));

    const response = await API.patients.deletePatientAlert(alertId);

    dispatch(setPatientAlertDetails(response.data.data.alerts ?? []));
  } catch (error) {
    dispatch(setPatientAlertDetails([]));
  } finally {
    dispatch(setIsAlertDeleted(false));
  }
};

const resetPatientAlerts = () => (dispatch: AppDispatch) => {
  dispatch(setPatientAlertDetails([]));
};

const setEncounterSearch = (searchValue: string) => (dispatch: AppDispatch) => {
  dispatch(setEncountersSearchValue(searchValue));
};

const setSelectedEncounterFilters = (selectedFilter: IEncountersFilterOption[]) => (dispatch: AppDispatch) => {
  dispatch(setEncountersSelectedFilters(selectedFilter));
};

const setCurrentPatient = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentPatientId(patientId));
};

const setCurrentEncounterId = (encounterId: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentEncounterID(encounterId));
};

export const createEncounterNote = (encounterNoteData: ICreateEncounterNoteProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreateEncounterNoteLoadingState(true));
    await API.patients.createEncounterNote(encounterNoteData);
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setCreateEncounterNoteLoadingState(false));
  }
};

export const updateEncounterNote =
  (newEncounterNoteData: IUpdateEncounterNoteProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setUpdateEncounterNoteLoadingState(true));

      const response = await API.patients.updateEncounterNote(newEncounterNoteData);

      dispatch(setEncounterDetailsInfo(response.data.data.encounter));
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setUpdateEncounterNoteLoadingState(false));
    }
  };

export const getEncounterFilters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setEncountersFiltersLoadingState(true));

    const response = await API.patients.getEncounterFilters();

    dispatch(setEncounterFilters(response.data.data.filters));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setEncountersFiltersLoadingState(false));
};

const getEncounterList = (encounterListData: IEncountersReqBody) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getEncounterList(encounterListData);
    const data: IEncounterList = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      encounters: response.data.data.encounters
    };

    dispatch(setEncountersList(data));
    dispatch(setEncountersLoadingState(false));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(cleanPatientList());
  }
};

const getEncountersTypes = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getEncounterTypes();

    dispatch(setEncountersType(response.data.data.encountersTypes));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getPatientRecentAppointments = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsRecentAppointmentsLoading(true));

    const response = await API.booking.getPatientRecentAppointments(patientId);

    dispatch(setRecentAppointments(response.data.appointments));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsRecentAppointmentsLoading(false));
  }
};

const emptyPatientRecentAppointments = () => (dispatch: AppDispatch) => {
  dispatch(setRecentAppointments([]));
};

const emptyPatientProfile = () => (dispatch: AppDispatch) => {
  dispatch(setPatientProfile(null));
};

const getPatientProfile = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientProfileLoading(true));

    const response = await API.patients.getPatientProfile(patientId);

    dispatch(setIsICFormComplete(response.data.data.isICFormComplete));

    const patientProfile = {
      id: patientId,
      ...response.data.data
    };

    dispatch(setPatientProfile(patientProfile));
  } catch (error) {
    dispatch(setPatientProfile(null));
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientProfileLoading(false));
  }
};

const getPatientHighlight = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientHighlights(patientId);

    dispatch(setPatientHighlightsLoadingState(true));

    dispatch(setIsPatientHighlightIntakeComplete(response.data.data.isIntakeComplete));
    dispatch(setIsPatientHighlightIntakeReminderActive(response.data.data.isIntakeReminderActive));

    if (response.data.data.header) {
      dispatch(setPatientHighlightHeader(response.data.data.header));
    }

    dispatch(setPatientHighlights(response.data.data.highlights));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setPatientHighlightsLoadingState(false));
  }
};

const sendPatientIntakeReminder = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    await API.patients.sendIntakeReminder(patientId);
    dispatch(setIsPatientHighlightIntakeReminderActive(false));
    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_SENT_REMINDER_MESSAGE_SUCCESS)
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getEncounterDetailsInformation = (encounterId?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setEncountersDetailsLoadingState(true));

    if (encounterId) {
      const response = await API.patients.getEncounterDetails(encounterId);

      dispatch(setEncounterDetailsInfo(response.data.data.encounter));
    } else {
      dispatch(setEncounterDetailsInfo(null));
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setEncountersDetailsLoadingState(false));
};

const createEncounterAddendum = (addendumData: ICreateEncounterAddendumRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCreateEncounterAddendumLoadingState(true));
    await API.patients.createEncounterAddendum(addendumData);
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setCreateEncounterAddendumLoadingState(false));
  }
};

const updateEncounterAddendum = (newAddendumData: IUpdateEncounterAddendumRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setUpdateEncounterAddendumLoadingState(true));

    const response = await API.patients.updateEncounterAddendum(newAddendumData);

    dispatch(setEncounterDetailsInfo(response.data.data.encounter));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setUpdateEncounterAddendumLoadingState(false));
  }
};

const getPatientProfileOverview = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientProfileOverviewLoading(true));

    const response = await API.patients.getPatientProfileOverview(patientId);

    dispatch(setPatientProfileOverview(response.data.data.overview));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientProfileOverviewLoading(false));
  }
};

const getProfileTestResultLatest = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getProfileTestResultLatest(patientId);

    dispatch(setLatestTestResults(response.data.data.testResults));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const cleanTestResultsHistory = () => async (dispatch: AppDispatch) => {
  dispatch(setTestResultsHistory(null));
};

const getProfileTestResultsHistory = (patientId: string, testTypeId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsTestResultsHistoryLoading(true));

    const response = await API.patients.getProfileTestResultsHistory(patientId, testTypeId);

    dispatch(setTestResultsHistory(response.data.data.testResultsHistory));
  } catch (error) {
    Sentry.captureException(error);
    dispatch(setTestResultsHistory(null));
  } finally {
    dispatch(setIsTestResultsHistoryLoading(false));
  }
};

const getProfileTestResults = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsProfileTestResultsLoading(true));

    const response = await API.patients.getProfileTestResults(patientId);

    dispatch(setProfileTestResults(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsProfileTestResultsLoading(false));
  }
};

const getProfileTestResultDetails =
  (id: string, type: TestResultItemType, patientId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsProfileTestResultDetailsLoading(true));

      const response = await API.patients.getProfileTestResultDetails(patientId, { id, type });

      dispatch(setProfileTestResultDetails(response.data.data.testResults));
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsProfileTestResultsLoading(false));
    }
  };

const getPatientContactInformation = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setPatientContactInformationLoadingState(true));

  try {
    const response = await API.patients.getContactInformation(patientId);

    dispatch(setPatientContactInformation(response.data.data.information));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setPatientContactInformationLoadingState(false));
  }
};

const getPatientAppointments =
  (
    patientId: string,
    page: number,
    order: SortOrder | null,
    orderBy: Exclude<keyof IPatientAppointment, 'time'> | null,
    selectedFilters?: GroupedFiltersOption[]
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const excludeTitleFilters = selectedFilters?.map(({ id, type }) => ({ id, type }));

      const { data, pageSize, currentPage, totalItems } = await bookingHelpers.getAppointmentsListFromParams({
        patientId,
        page,
        order,
        orderBy,
        filters: excludeTitleFilters
      });

      dispatch(
        setPatientAppointments({
          list: {
            appointments: data.appointments,
            currentPage,
            pageSize,
            totalItems
          },
          order,
          orderBy,
          selectedFilters,
          status: AppointmentResponseStatus.SUCCESS
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(setPatientAppointmentsRequestStatus(AppointmentResponseStatus.FAIL));
    }
  };

const setCurrentAppointmentType = (appointmentType: string) => async (dispatch: AppDispatch) => {
  dispatch(setCurrentAppointmentFilterType(appointmentType));
};

const resetAppointmentsList = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const currentValues = getState().patients.patientAppointments;

    dispatch(
      setPatientAppointments({
        ...currentValues,
        filters: null,
        selectedFilters: [],
        order: SortOrder.Asc,
        orderBy: PatientAppointmentsSortField.Date,
        status: AppointmentResponseStatus.IDLE,
        list: {
          ...currentValues.list,
          appointments: null
        }
      })
    );
  } catch (error) {
    Sentry.captureException(error);
  }
};

const getGeneralHealth = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsGeneralHealthLoading(true));

  try {
    const response = await API.patients.getGeneralHealth(patientId);

    dispatch(setGeneralHealth(response.data.data.generalHealth));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsGeneralHealthLoading(false));
};

const getFertilityHistory = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsFertilityHistoryLoading(true));

  try {
    const response = await API.patients.getFertilityHistory(patientId);

    dispatch(setFertilityHistory(response.data.data.fertilityHistory));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsFertilityHistoryLoading(false));
};

const updateFertilityHistory =
  (patientId: string, data: IFertilityHistory, onSave: (isSuccessfullySaved: boolean) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsFertilityHistoryDataUpdating(true));

    try {
      const response = await API.patients.updateFertilityHistory(patientId, data);

      if (response) {
        dispatch(getFertilityHistory(patientId));
        onSave(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      onSave(false);
    }

    dispatch(setIsFertilityHistoryDataUpdating(false));
  };

const getFemalePatientMenstrualCycleHistory = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsFemalePatientMenstrualCycleHistoryLoading(true));

  try {
    const response = await API.patients.getFemalePatientMenstrualCycleHistory(patientId);

    dispatch(setFemalePatientMenstrualCycleHistory(response.data.data.menstrualHistory));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsFemalePatientMenstrualCycleHistoryLoading(false));
};

const updateFemalePatientMenstrualCycleHistory =
  (patientId: string, data: IFemalePatientMenstrualCycleHistoryProps, onSave: (isSuccessfullySaved: boolean) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsFemalePatientMenstrualCycleHistoryDataUpdating(true));

    try {
      const response = await API.patients.updateFemalePatientMenstrualCycleHistory(patientId, data);

      if (response) {
        dispatch(getFemalePatientMenstrualCycleHistory(patientId));
        onSave(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      onSave(false);
    }

    dispatch(setIsFemalePatientMenstrualCycleHistoryDataUpdating(false));
  };

const getPatientPrescriptions = (patientId: string, page: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientPrescriptionsLoading(true));

    const response = await API.patients.getPatientPrescriptions(patientId, page);
    const prescriptionData = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      prescriptions: response.data.data.prescriptions
    };

    dispatch(setPatientPrescriptions(prescriptionData));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientPrescriptionsLoading(false));
  }
};

const getPrescriptionStatuses = () => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPrescriptionStatuses();

    dispatch(setPrescriptionStatuses(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const createPatientPrescription = (prescriptionData: ICreatePatientPrescription) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPrescriptionCreationLoading(true));

    const response = await API.patients.createPatientPrescription(prescriptionData);

    if (response.data.data.uuid) {
      dispatch(setCurrentPrescriptionUuid(response.data.data.uuid));
      dispatch(setPatientPrescriptionsListItems(null));
    }
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPrescriptionCreationLoading(false));
  }
};

const resetCurrentPrescriptionUuid = () => (dispatch: AppDispatch) => {
  dispatch(setCurrentPrescriptionUuid(''));
};

const archivePatientPrescription = (prescriptionId: string, patientId: string) => async (dispatch: AppDispatch) => {
  try {
    await API.patients.archivePatientPrescription(prescriptionId);
    dispatch(patientsMiddleware.getPatientPrescriptions(patientId, 1));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const downloadPatientPrescription = (transportFolderId: string) => async () => {
  try {
    const response = await API.patients.downloadPatientPrescription(transportFolderId);

    if (response) {
      return response.data;
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  return null;
};

const markPatientPrescriptionDispensed =
  (prescriptionId: string, patientId: string) => async (dispatch: AppDispatch) => {
    try {
      await API.patients.markPatientPrescriptionDispensed(prescriptionId);
      dispatch(patientsMiddleware.getPatientPrescriptions(patientId, 1));
    } catch (error) {
      Sentry.captureException(error);
    }
  };
const getPatientMedications = (patientId: string, recency: Recency, page: number) => async (dispatch: AppDispatch) => {
  try {
    switch (recency) {
      case Recency.Current:
        dispatch(setIsPatientCurrentMedicationLoading(true));
        break;
      case Recency.Past:
        dispatch(setIsPatientPastMedicationLoading(true));
        break;
      default:
        dispatch(setIsPatientCurrentMedicationLoading(false));
        dispatch(setIsPatientPastMedicationLoading(false));
    }

    const response = await API.patients.getPatientMedications(patientId, recency, page);
    const medicationData = {
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize,
      medications: response.data.data.medications
    };

    switch (recency) {
      case Recency.Current:
        dispatch(setPatientCurrentMedications(medicationData));
        break;
      case Recency.Past:
        dispatch(setPatientPastMedications(medicationData));
        break;
      case Recency.Missing:
        dispatch(setPatientMissingMedications(medicationData));
        break;
      default:
        dispatch(setPatientCurrentMedications({ medications: [], pageSize: 5, currentPage: 0, totalItems: 0 }));
        dispatch(setPatientPastMedications({ medications: [], pageSize: 5, currentPage: 0, totalItems: 0 }));
        dispatch(setPatientMissingMedications({ medications: [], pageSize: 5, currentPage: 0, totalItems: 0 }));
    }
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientCurrentMedicationLoading(false));
    dispatch(setIsPatientPastMedicationLoading(false));
  }
};

const getFemalePatientGynaecologicalHistory = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsFemalePatientGynaecologicalHistoryLoading(true));

  try {
    const response = await API.patients.getFemalePatientGynaecologicalHistory(patientId);

    dispatch(setFemalePatientGynaecologicalHistory(response.data.data.gynaecologicalHistory));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsFemalePatientGynaecologicalHistoryLoading(false));
};

const getDrugs = (searchString: string, page: number, categoryId?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsDrugLoading(true));

    const response = await API.patients.getDrugs(searchString, page, categoryId);

    dispatch(setDrugs(response.data.data.medications));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsDrugLoading(false));
  }
};

const getMedicationDropdownOptions = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsDropdownOptionsLoading(true));

    const response = await API.patients.getMedicationDropdownOptions();

    dispatch(setDropdownOptions(response.data.data.dropdowns));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsDropdownOptionsLoading(false));
  }
};

const createPatientMedication = (data: ICreateMedication, patientName: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsMedicationCreatedLoading(true));

  try {
    const response = await API.patients.createPatientMedication(data);

    if (response.data.data.uuid) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: `${t(Translation.MODAL_CREATE_MEDICATION_TOAST)} ${patientName}`
          }
        })
      );
      dispatch(patientsMiddleware.getPatientMedications(data.patientId, Recency.Current, 1));
      dispatch(viewsMiddleware.closeModal(ModalName.AddPatientMedicationModal));
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsMedicationCreatedLoading(false));
};
const updatePatientMedication = (data: IUpdateMedication, patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsMedicationUpdatedLoading(true));

  try {
    await API.patients.updatePatientMedication(data);
    dispatch(patientsMiddleware.getPatientMedications(patientId, Recency.Current, 1));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsMedicationUpdatedLoading(false));
};

const updateCardToEditMode = (index: number, prevState: boolean[]) => (dispatch: AppDispatch) => {
  try {
    const newState = [...prevState];

    newState[index] = !newState[index];

    dispatch(setCardToEditMode(newState));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const setPatientPrescriptionsItems = (listItems?: PatientPrescriptionsDrugListProps[]) => (dispatch: AppDispatch) => {
  if (listItems && listItems.length) {
    dispatch(setPatientPrescriptionsListItems(listItems));
  } else {
    dispatch(setPatientPrescriptionsListItems(null));
  }
};

const removePatientPrescriptionItem = (itemIndex: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const prescriptionListItems = getState().patients.medicationsPrescriptions.prescriptions.prescriptionsDrugList;

  if (prescriptionListItems?.length) {
    const filteredPrescriptionListItems = prescriptionListItems.filter(
      (prescriptionListItem) => prescriptionListItem.id !== itemIndex
    );

    dispatch(setPatientPrescriptionsListItems(filteredPrescriptionListItems));
  } else {
    dispatch(setPatientPrescriptionsListItems(null));
  }
};

const getPatientMedicationsState = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await API.patients.getPatientMedicationsState(patientId);

    dispatch(setPatientMedicationsState(response.data.data));
  } catch (error) {
    Sentry.captureException(error);
  }
};

const updateFemalePatientGynaecologicalHistory =
  (patientId: string, data: IFemalePatientGynaecologicalHistoryProps, onSave: (isSuccessfullySaved: boolean) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsFemalePatientGynaecologicalHistoryDataUpdating(true));

    try {
      const response = await API.patients.updateFemalePatientGynaecologicalHistory(patientId, data);

      if (response) {
        dispatch(getFemalePatientGynaecologicalHistory(patientId));
        onSave(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      onSave(false);
    }

    dispatch(setIsFemalePatientGynaecologicalHistoryDataUpdating(false));
  };

const changeContactInformationEditButtonState = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const editButtonState = getState().patients.medicalBackground.contact.isContactInformationEditButtonClicked;

  dispatch(setIsContactInformationEditButtonClicked(!editButtonState));
};

const changePatientBackgroundEditButtonState = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const editButtonState =
    getState().patients.medicalBackground.contact.patientBackground.isPatientBackgroundEditButtonClicked;

  dispatch(setIsPatientBackgroundEditButtonClicked(!editButtonState));
};

const changeManuallyAddressForPrimary = (address: AddManuallyAddressModalProps) => async (dispatch: AppDispatch) => {
  dispatch(setManuallyAddressForPrimary(address));
};

const getFemalePregnancyInformation = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsFemalePregnancyInformationLoading(true));

  try {
    const response = await API.patients.getFemalePregnancyInformation(patientId);

    dispatch(setFemalePregnancyInformation(response.data.data.GTPAETALS));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsFemalePregnancyInformationLoading(false));
};

const updateFemalePregnancyInformation =
  (patientId: string, data: IFemalePregnancyInformationProps, onSave: (isSuccessfullySaved: boolean) => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsFemalePregnancyInformationDataUpdating(true));

    try {
      const response = await API.patients.updateFemalePregnancyInformation(patientId, data);

      if (response) {
        dispatch(getFemalePregnancyInformation(patientId));
        onSave(true);
      }
    } catch (error) {
      Sentry.captureException(error);
      onSave(false);
    }

    dispatch(setIsFemalePregnancyInformationDataUpdating(false));
  };

const getPatientMedicalBackgroundDropdownOptions = () => async (dispatch: AppDispatch) => {
  dispatch(setIsDropdownsLoading(true));

  try {
    const response = await API.patients.getPatientMedicalBackgroundDropdownOptions();

    dispatch(setDropdowns(response.data.data.dropdowns));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsDropdownsLoading(false));
};
const changeManuallyAddressForMailing = (address: AddManuallyAddressModalProps) => async (dispatch: AppDispatch) => {
  dispatch(setManuallyAddressForMailing(address));
};

const getMedicalContactInformation = (patientId: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsMedicalPatientContactInformationLoading(true));

  try {
    const response = await API.patients.getPatientContactInformation(patientId);

    dispatch(setMedicalPatientContactInformation(response.data.data.contactInformation));
  } catch (error) {
    Sentry.captureException(error);
  }

  dispatch(setIsMedicalPatientContactInformationLoading(false));
};

const getPatientBackgroundInformation = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPatientBackgroundInformationLoading(true));

    const response = await API.patients.getPatientBackgroundInformation(patientId);

    dispatch(setBackgroundInformation(response.data.data.patientBackgroundInformation));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPatientBackgroundInformationLoading(false));
  }
};

const setEditMalePatientGenitourinaryState = (isEdit: boolean) => async (dispatch: AppDispatch) => {
  dispatch(setIsEditMalePatientGenitourinaryState(isEdit));
};

const getMaleGenitourinaryHistory = (patientId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsMalePatientGenitourinaryHistoryLoading(true));

    const response = await API.patients.getMaleGenitourinaryHistory(patientId);

    dispatch(setMalePatientGynaecologicalHistory(response.data.data.genitourinaryHistory));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsMalePatientGenitourinaryHistoryLoading(false));
  }
};

const changeEditButtonClickState = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const editButtonState = getState().patients.medicalBackground.contact.isGeneralHealthEditButtonClicked;

  dispatch(setIsEditButtonClicked(!editButtonState));
};

const updateGeneralHealthData =
  (patientId: string, healthData: IGeneralHealthProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsGeneralHealthDataUpdating(true));

      const response = await API.patients.updateGeneralHealth(patientId, healthData);

      if (response) {
        dispatch(patientsMiddleware.changeEditButtonClickState());
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_SUCCESS_TOAST_MESSAGE)
            }
          })
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsGeneralHealthDataUpdating(false));
    }
  };

const verifyPatientProfilePhoto = (patientId: string, accepted: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsVerifyPatientProfilePhotoLoading(true));

    await API.patients.verifyPatientProfilePhoto(patientId, accepted);
    dispatch(getPatientProfile(patientId));
    dispatch(viewsMiddleware.closeModal(ModalName.VerifyPatientPhotoModal));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsVerifyPatientProfilePhotoLoading(false));
  }
};

const updatePatientContactInformation =
  (patientId: string, contactData: IPatientContactInformationProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsContactInformationUpdateLoading(true));

      const response = await API.patients.updatePatientContactInformation(patientId, contactData);

      if (response) {
        dispatch(patientsMiddleware.changeContactInformationEditButtonState());
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_SUCCESS_TOAST_MESSAGE)
            }
          })
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsContactInformationUpdateLoading(false));
    }
  };

const updatePatientBackgroundInformation =
  (patientId: string, backgroundInfo: IPatientBackgroundPartners) => async (dispatch: AppDispatch) => {
    dispatch(setIsUpdatePatientBackgroundInformationLoading(true));

    try {
      const response = await API.patients.updatePatientBackgroundInformation(patientId, backgroundInfo);

      if (response) {
        dispatch(patientsMiddleware.changePatientBackgroundEditButtonState());
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_SUCCESS_TOAST_MESSAGE)
            }
          })
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    }

    dispatch(setIsUpdatePatientBackgroundInformationLoading(false));
  };

const getPatientPlansList = (patientId: string, page?: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsPlansListLoading(true));

    const response = await API.patients.getPatientPlansList({ patientId, page });
    const data = {
      ...response.data.data,
      totalItems: response.data.totalItems,
      currentPage: response.data.currentPage,
      pageSize: response.data.pageSize
    };

    dispatch(setPlansList(data));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsPlansListLoading(false));
  }
};

const getPatientPlansStatuses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsStatusVariationsLoading(true));

    const response = await API.patients.getPatientPlansStatuses();

    dispatch(setStatusVariations(response.data.data.variations));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsStatusVariationsLoading(false));
  }
};

const getPlanCategoriesAndTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsCategoriesLoading(true));

    const response = await API.patients.getPlanCategoriesAndTypes();

    dispatch(setCategories(response.data.data.categories));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsCategoriesLoading(false));
  }
};

const sendBookingRequestToPatient = (data: ISendBookingRequestToPatientRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsBookingRequestToPatientLoading(true));

    await API.patients.sendBookingRequestToPatient(data);

    dispatch(
      viewsMiddleware.setToastNotificationPopUpState({
        open: true,
        props: {
          severityType: SeveritiesType.success,
          description: t(Translation.PAGE_APPOINTMENTS_SEND_BOOKING_REQUEST_SUCCESS_MESSAGE),
          dataCy: CypressIds.PAGE_APPOINTMENTS_SEND_BOOKING_REQUEST_SUCCESS_MESSAGE
        }
      })
    );
    dispatch(viewsMiddleware.closeModal(ModalName.ConfirmBookingRequestToPatientModal));
    dispatch(viewsMiddleware.closeModal(ModalName.SendBookingRequestToPatientModal));
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    dispatch(setIsBookingRequestToPatientLoading(false));
  }
};

const markThePlanAsCancelled = (data: IPlanMutation) => async () => {
  try {
    await API.patients.markThePlanAsCancelled(data);
  } catch (error) {
    Sentry.captureException(error);
  }
};
const markThePlanAsActive = (data: IPlanMutation) => async () => {
  try {
    await API.patients.markThePlanAsActive(data);
  } catch (error) {
    Sentry.captureException(error);
  }
};
const markThePlanAsCompleted = (data: IPlanMutation) => async () => {
  try {
    await API.patients.markThePlanAsCompleted(data);
  } catch (error) {
    Sentry.captureException(error);
  }
};

const updatePatientGenitourinaryHistory =
  (patientId: string, genitourinaryHistory: IGenitourinaryHistory) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsMalePatientGenitourinaryHistoryLoading(true));

      const response = await API.patients.updatePatientGenitourinaryHistory(patientId, genitourinaryHistory);

      if (response) {
        dispatch(patientsMiddleware.setEditMalePatientGenitourinaryState(false));
        dispatch(patientsMiddleware.getMaleGenitourinaryHistory(patientId));
        dispatch(
          viewsMiddleware.setToastNotificationPopUpState({
            open: true,
            props: {
              severityType: SeveritiesType.success,
              description: t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_SUCCESS_TOAST_MESSAGE)
            }
          })
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    } finally {
      dispatch(setIsMalePatientGenitourinaryHistoryLoading(false));
    }
  };

export default {
  getPatientsList,
  verifyPatientProfilePhoto,
  getPatientSearchFilters,
  getPatientAlertDetails,
  resetPatientAlerts,
  getPatientProfileOverview,
  setPatientPrescriptionsItems,
  removePatientPrescriptionItem,
  setEncountersLoadingState,
  resetAppointmentsList,
  createPatientAlert,
  editPatientAlert,
  deletePatientAlert,
  archivePatientPrescription,
  markPatientPrescriptionDispensed,
  getEncounterList,
  updatePatientGenitourinaryHistory,
  getPatientRecentAppointments,
  emptyPatientRecentAppointments,
  setEncounterSearch,
  setSelectedEncounterFilters,
  getEncounterFilters,
  setCurrentPatient,
  cleanPatientList,
  createEncounterNote,
  updateEncounterNote,
  getPatientProfile,
  emptyPatientProfile,
  getPatientHighlight,
  downloadPatientPrescription,
  getEncountersTypes,
  getEncounterDetailsInformation,
  createEncounterAddendum,
  updateEncounterAddendum,
  setCurrentEncounterId,
  getProfileTestResultLatest,
  getProfileTestResultsHistory,
  getProfileTestResults,
  getProfileTestResultDetails,
  getPatientAppointments,
  cleanEncountersList,
  setCurrentAppointmentType,
  getPatientContactInformation,
  sendPatientIntakeReminder,
  cleanTestResultsHistory,
  isPatientAlertViewOpen,
  getGeneralHealth,
  changeEditButtonClickState,
  updateGeneralHealthData,
  getFertilityHistory,
  getFemalePregnancyInformation,
  getPatientMedicalBackgroundDropdownOptions,
  changeContactInformationEditButtonState,
  getPatientBackgroundInformation,
  updatePatientBackgroundInformation,
  getMedicalContactInformation,
  changePatientBackgroundEditButtonState,
  changeManuallyAddressForPrimary,
  changeManuallyAddressForMailing,
  updatePatientContactInformation,
  getFemalePatientMenstrualCycleHistory,
  getFemalePatientGynaecologicalHistory,
  getPatientMedications,
  updateFertilityHistory,
  getDrugs,
  resetCurrentPrescriptionUuid,
  createPatientPrescription,
  getPatientMedicationsState,
  getMedicationDropdownOptions,
  getMaleGenitourinaryHistory,
  createPatientMedication,
  updatePatientMedication,
  updateCardToEditMode,
  getPatientPrescriptions,
  getPrescriptionStatuses,
  updateFemalePregnancyInformation,
  updateFemalePatientMenstrualCycleHistory,
  setEditMalePatientGenitourinaryState,
  updateFemalePatientGynaecologicalHistory,
  getPatientPlansList,
  getPatientPlansStatuses,
  getPlanCategoriesAndTypes,
  sendBookingRequestToPatient,
  markThePlanAsCancelled,
  markThePlanAsActive,
  markThePlanAsCompleted
};
