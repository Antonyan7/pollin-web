import { ISendBookingRequestToPatientRequest } from '@components/Modals/Booking/SendBookingRequestToPatientModal/types';
import * as Sentry from '@sentry/nextjs';
import { AxiosResponse } from 'axios';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IAlertDetailsResponse,
  ICreateEncounterAddendumRequest,
  ICreateEncounterNoteRequest,
  ICreatePatientPrescription,
  ICreatePatientPrescriptionMedicationResponse,
  IDropdownsResponse,
  IDrugsResponse,
  IEncounterFilterResponse,
  IEncounterTypesResponse,
  IFemalePatientGynaecologicalHistory,
  IFemalePatientGynaecologicalHistoryProps,
  IFemalePatientMenstrualCycleHistory,
  IFemalePatientMenstrualCycleHistoryProps,
  IFemalePregnancyInformation,
  IFemalePregnancyInformationProps,
  IFertilityHistory,
  IGeneralHealth,
  IGeneralHealthProps,
  IGenitourinaryHistory,
  IGenitourinaryHistoryRes,
  IGetPatientsRequestBody,
  IGetPatientsResponse,
  IMedicalContactInformation,
  INewPatientPlan,
  IOrderPatientPlanRequestData,
  IPatientBackground,
  IPatientBackgroundPartners,
  IPatientContactInformationProps,
  IPatientContactInformationResponse,
  IPatientEncountersListResponse,
  IPatientHighlightDetailsResponse,
  IPatientHighlightResponse,
  IPatientMedications,
  IPatientMedicationsState,
  IPatientPlansCategoriesAndTypesResponse,
  IPatientPlansListData,
  IPatientPlansStatusResponse,
  IPatientPrescriptions,
  IPatientProfileOverviewResponse,
  IPatientProfileResponse,
  IPatientsFiltersResponse,
  IPatientsListResponse,
  IPlanMutation,
  IPrescriptionStatuses,
  IProfileTestResultDetailsResponse,
  IProfileTestResults,
  IReadyToOrderPatientPlanResponse,
  ITestResultHistoryResponse,
  IUpdateEncounterAddendumRequest,
  IUpdateEncounterNoteRequest,
  ProfileTestResultDetailsRequest,
  Recency
} from 'manager/patientEmr/managerPatientEmrTypes';
import { CustomAlerts, IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import {
  ICreateMedication,
  IEncounterDetailsResponse,
  ILatestTestResult,
  IUpdateMedication
} from 'types/reduxTypes/patient-emrStateTypes';

const baseURL = '/clinic-patient-emr';
const baseURLTestsResults = '/clinic-test-results';
const axiosInstance = Axios();

const patientEmrManager = {
  axiosInstance,
  getPatientAlertDetails(patientId: string, signal?: AbortSignal) {
    return axiosInstance.get<IAlertDetailsResponse, IAxiosResponse<IAlertDetailsResponse>>(
      `${baseURL}/v1/patients/alerts`,
      {
        params: { patientId },
        signal
      }
    );
  },
  createPatientAlert(patientId: string, alert: CustomAlerts) {
    return axiosInstance.post<IAlertDetailsResponse, IAxiosResponse<IAlertDetailsResponse>>(
      `${baseURL}/v1/patients/custom-alerts`,
      {
        patientId,
        alert
      }
    );
  },
  editPatientAlert(patientId: string, alert: CustomAlerts) {
    return axiosInstance.put<IAlertDetailsResponse, IAxiosResponse<IAlertDetailsResponse>>(
      `${baseURL}/v1/patients/custom-alerts`,
      {
        patientId,
        alert
      }
    );
  },
  deletePatientAlert(alertId: string) {
    return axiosInstance.delete<IAlertDetailsResponse, IAxiosResponse<IAlertDetailsResponse>>(
      `${baseURL}/v1/patients/custom-alerts`,
      { data: { alertId } }
    );
  },
  getPatients(data: IGetPatientsRequestBody) {
    return axiosInstance.post<IGetPatientsResponse, IAxiosResponsePaginated<IGetPatientsResponse>>(
      `${baseURL}/v1/patients`,
      data
    );
  },
  verifyPatientProfilePhoto(patientId: string, accepted: boolean) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/profile/${patientId}/verify-photo`, {
      accepted
    });
  },
  getPatientsList(data: IPatientsReqBody) {
    return axiosInstance.post<IPatientsListResponse, IAxiosResponsePaginated<IPatientsListResponse>>(
      `${baseURL}/v1/patients/search`,
      data
    );
  },
  getEncounterList(data: IEncountersReqBody) {
    return axiosInstance.post<IPatientEncountersListResponse, IAxiosResponsePaginated<IPatientEncountersListResponse>>(
      `${baseURL}/v1/encounters/list`,
      data
    );
  },
  getEncounterTypes() {
    return axiosInstance.get<IEncounterTypesResponse, IAxiosResponse<IEncounterTypesResponse>>(
      `${baseURL}/v1/encounters/type`
    );
  },
  getEncounterDetails(encounterId: string) {
    return axiosInstance.get<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters/${encounterId}`
    );
  },
  getPatientSearchFilters() {
    return axiosInstance.get<IPatientsFiltersResponse, IAxiosResponse<IPatientsFiltersResponse>>(
      `${baseURL}/v1/patients/search/filter`
    );
  },
  getEncounterFilters(patientId: string) {
    return axiosInstance.get<IEncounterFilterResponse, IAxiosResponse<IEncounterFilterResponse>>(
      `${baseURL}/v1/encounters/filters`,
      {
        params: {
          patientId
        }
      }
    );
  },
  createEncounterNote(data: ICreateEncounterNoteRequest) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/encounters`, data);
  },
  updateEncounterNote(data: IUpdateEncounterNoteRequest) {
    return axiosInstance.put<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters`,
      data
    );
  },
  createEncounterAddendum(data: ICreateEncounterAddendumRequest) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/encounters/addendum`, data);
  },
  updateEncounterAddendum(data: IUpdateEncounterAddendumRequest) {
    return axiosInstance.put<IEncounterDetailsResponse, IAxiosResponse<IEncounterDetailsResponse>>(
      `${baseURL}/v1/encounters/addendum`,
      data
    );
  },
  getPatientProfile(patientId: string) {
    return axiosInstance.get<IPatientProfileResponse, IAxiosResponse<IPatientProfileResponse>>(
      `${baseURL}/v1/profile/${patientId}`
    );
  },
  getPatientHighlights(patientId: string) {
    return axiosInstance.get<IPatientHighlightResponse, IAxiosResponse<IPatientHighlightResponse>>(
      `${baseURL}/v1/profile/${patientId}/highlight`
    );
  },
  getPatientHighlightDetails(patientId: string, uiid: string) {
    return axiosInstance
      .get<IPatientHighlightDetailsResponse, IAxiosResponse<IPatientHighlightDetailsResponse>>(
        `${baseURL}/v1/profile/${patientId}/highlight/${uiid}`
      )
      .then(
        ({ data }) => data.data,
        (error) => {
          Sentry.captureException(error);

          return null;
        }
      );
  },
  getPatientProfileOverview(patientId: string) {
    return axiosInstance.get<IPatientProfileOverviewResponse, IAxiosResponse<IPatientProfileOverviewResponse>>(
      `${baseURL}/v1/profile/${patientId}/overview`
    );
  },
  getProfileTestResults(patientId: string) {
    return axiosInstance.get<IProfileTestResults, IAxiosResponse<IProfileTestResults>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}`
    );
  },
  getProfileTestResultDetails(patientId: string) {
    return axiosInstance.post<ProfileTestResultDetailsRequest, IAxiosResponse<IProfileTestResultDetailsResponse>>(
      `${baseURLTestsResults}/v1/test-result`,
      {
        patientId,
        page: 1
      }
    );
  },
  getProfileTestResultLatest(patientId: string) {
    return axiosInstance.get<ILatestTestResult, IAxiosResponse<ILatestTestResult>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/latest`
    );
  },
  getProfileTestResultsHistory(patientId: string, testTypeId: string) {
    return axiosInstance.get<ITestResultHistoryResponse, IAxiosResponse<ITestResultHistoryResponse>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/testType/${testTypeId}/history`
    );
  },
  getContactInformation(patientId: string) {
    return axiosInstance.get<IPatientContactInformationResponse, IAxiosResponse<IPatientContactInformationResponse>>(
      `${baseURL}/v1/profile/${patientId}/confirmation`
    );
  },
  sendIntakeReminder(patientId: string) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/profile/send-intake-reminder`, {
      patientId
    });
  },
  // medical background
  getGeneralHealth(patientId: string) {
    return axiosInstance.get<IGeneralHealth, IAxiosResponse<IGeneralHealth>>(
      `${baseURL}/v1/medical-background/${patientId}/general-health`
    );
  },
  updateGeneralHealth(patientId: string, data: IGeneralHealthProps) {
    return axiosInstance.put<IGeneralHealth, IAxiosResponse<IGeneralHealth>>(
      `${baseURL}/v1/medical-background/${patientId}/general-health`,
      {
        generalHealth: data
      }
    );
  },
  updatePatientGenitourinaryHistory(patientId: string, data: IGenitourinaryHistory) {
    return axiosInstance.put<null, IAxiosResponse<null>>(
      `${baseURL}/v1/medical-background/${patientId}/genitourinary-history`,
      {
        genitourinaryHistory: data
      }
    );
  },
  getFertilityHistory(patientId: string) {
    return axiosInstance.get<IFertilityHistory, IAxiosResponse<IFertilityHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/fertility-history`
    );
  },
  updateFertilityHistory(patientId: string, data: IFertilityHistory) {
    return axiosInstance.put<IFertilityHistory, IAxiosResponse<IFertilityHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/fertility-history`,
      {
        fertilityHistory: data
      }
    );
  },
  getPatientContactInformation(patientId: string) {
    return axiosInstance.get<IMedicalContactInformation, IAxiosResponse<IMedicalContactInformation>>(
      `${baseURL}/v1/medical-background/${patientId}/contact-information`
    );
  },
  getPatientBackgroundInformation(patientId: string) {
    return axiosInstance.get<IPatientBackground, IAxiosResponse<IPatientBackground>>(
      `${baseURL}/v1/medical-background/${patientId}/background-information`
    );
  },
  getMaleGenitourinaryHistory(patientId: string) {
    return axiosInstance.get<IGenitourinaryHistoryRes, IAxiosResponse<IGenitourinaryHistoryRes>>(
      `${baseURL}/v1/medical-background/${patientId}/genitourinary-history`
    );
  },
  updatePatientContactInformation(patientId: string, data: IPatientContactInformationProps) {
    return axiosInstance.put<IMedicalContactInformation, IAxiosResponse<IMedicalContactInformation>>(
      `${baseURL}/v1/medical-background/${patientId}/contact-information`,
      {
        contactInformation: data
      }
    );
  },
  updatePatientBackgroundInformation(patientId: string, data: IPatientBackgroundPartners) {
    return axiosInstance.put<null, IAxiosResponse<null>>(
      `${baseURL}/v1/medical-background/${patientId}/background-information`,
      {
        patientBackgroundInformation: data
      }
    );
  },
  getFemalePregnancyInformation(patientId: string) {
    return axiosInstance.get<IFemalePregnancyInformation, IAxiosResponse<IFemalePregnancyInformation>>(
      `${baseURL}/v1/medical-background/${patientId}/gtpaetals`
    );
  },
  updateFemalePregnancyInformation(patientId: string, data: IFemalePregnancyInformationProps) {
    return axiosInstance.put<IFemalePregnancyInformation, IAxiosResponse<IFemalePregnancyInformation>>(
      `${baseURL}/v1/medical-background/${patientId}/gtpaetals`,
      {
        GTPAETALS: data
      }
    );
  },
  getPatientMedicalBackgroundDropdownOptions() {
    return axiosInstance.get<IDropdownsResponse, IAxiosResponse<IDropdownsResponse>>(
      `${baseURL}/v1/medical-background/dropdown-options`
    );
  },
  getFemalePatientMenstrualCycleHistory(patientId: string) {
    return axiosInstance.get<IFemalePatientMenstrualCycleHistory, IAxiosResponse<IFemalePatientMenstrualCycleHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/menstrual-history`
    );
  },
  updateFemalePatientMenstrualCycleHistory(patientId: string, data: IFemalePatientMenstrualCycleHistoryProps) {
    return axiosInstance.put<IFemalePatientMenstrualCycleHistory, IAxiosResponse<IFemalePatientMenstrualCycleHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/menstrual-history`,
      {
        menstrualHistory: data
      }
    );
  },
  getFemalePatientGynaecologicalHistory(patientId: string) {
    return axiosInstance.get<IFemalePatientGynaecologicalHistory, IAxiosResponse<IFemalePatientGynaecologicalHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/gynaecological-history`
    );
  },
  updateFemalePatientGynaecologicalHistory(patientId: string, data: IFemalePatientGynaecologicalHistoryProps) {
    return axiosInstance.put<IFemalePatientGynaecologicalHistory, IAxiosResponse<IFemalePatientGynaecologicalHistory>>(
      `${baseURL}/v1/medical-background/${patientId}/gynaecological-history`,
      {
        gynaecologicalHistory: data
      }
    );
  },
  getDrugs(searchString: string, page: number, categoryId?: string) {
    return axiosInstance.post<IDrugsResponse, IAxiosResponse<IDrugsResponse>>(`${baseURL}/v1/medications/search`, {
      searchString,
      page,
      ...(categoryId && { categoryId })
    });
  },
  getPatientMedicationsState(patientId: string) {
    return axiosInstance.get<IPatientMedicationsState, IAxiosResponse<IPatientMedicationsState>>(
      `${baseURL}/v1/prescriptions/medications-state`,
      {
        params: {
          patientId
        }
      }
    );
  },
  archivePatientPrescription(prescriptionId: string) {
    return axiosInstance.delete<null, IAxiosResponse<null>>(`${baseURL}/v1/prescriptions`, {
      data: { prescriptionId }
    });
  },
  markPatientPrescriptionDispensed(prescriptionId: string) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/prescriptions/mark-as-dispensed`, {
      prescriptionId
    });
  },
  getPatientMedications(patientId: string, recency: Recency, page: number) {
    return axiosInstance.get<IPatientMedications, IAxiosResponsePaginated<IPatientMedications>>(
      `${baseURL}/v1/prescriptions/medications`,
      {
        params: {
          patientId,
          recency,
          page
        }
      }
    );
  },
  getPatientPrescriptions(patientId: string, page: number) {
    return axiosInstance.get<IPatientPrescriptions, IAxiosResponsePaginated<IPatientPrescriptions>>(
      `${baseURL}/v1/prescriptions`,
      {
        params: {
          patientId,
          page
        }
      }
    );
  },
  getPrescriptionStatuses() {
    return axiosInstance.get<IPrescriptionStatuses, IAxiosResponse<IPrescriptionStatuses>>(
      `${baseURL}/v1/prescriptions/status`
    );
  },
  getMedicationDropdownOptions() {
    return axiosInstance.get<IDropdownsResponse, IAxiosResponse<IDropdownsResponse>>(
      `${baseURL}/v1/prescriptions/dropdown-options`
    );
  },
  downloadPatientPrescription(prescriptionId: string) {
    return axiosInstance.get<void, AxiosResponse<BlobPart>>(
      `/clinic-downloads/v1/prescriptions/${prescriptionId}/download`,
      {
        responseType: 'blob'
      }
    );
  },
  createPatientMedication(data: ICreateMedication) {
    return axiosInstance.post<
      ICreatePatientPrescriptionMedicationResponse,
      IAxiosResponse<ICreatePatientPrescriptionMedicationResponse>
    >(`${baseURL}/v1/prescriptions/medications`, data);
  },
  updatePatientMedication(data: IUpdateMedication) {
    return axiosInstance.put<null, IAxiosResponse<null>>(`${baseURL}/v1/prescriptions/medications`, data);
  },
  createPatientPrescription(data: ICreatePatientPrescription) {
    return axiosInstance.post<
      ICreatePatientPrescriptionMedicationResponse,
      IAxiosResponse<ICreatePatientPrescriptionMedicationResponse>
    >(`${baseURL}/v1/prescriptions`, data);
  },

  // Patient Plans
  getPatientPlansList({ patientId, page }: { patientId: string; page?: number }) {
    return axiosInstance.get<IPatientPlansListData, IAxiosResponsePaginated<IPatientPlansListData>>(
      `${baseURL}/v1/plans`,
      {
        params: {
          patientId,
          ...(typeof page === 'number' && {
            page
          })
        }
      }
    );
  },
  getPatientPlansStatuses() {
    return axiosInstance.get<IPatientPlansStatusResponse, IAxiosResponse<IPatientPlansStatusResponse>>(
      `${baseURL}/v1/plans/status`
    );
  },
  getPlanCategoriesAndTypes() {
    return axiosInstance.get<
      IPatientPlansCategoriesAndTypesResponse,
      IAxiosResponse<IPatientPlansCategoriesAndTypesResponse>
    >(`${baseURL}/v1/plans/categories-plan-types`);
  },
  sendBookingRequestToPatient(data: ISendBookingRequestToPatientRequest) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/patient-milestone`, data);
  },
  markThePlanAsCancelled(data: IPlanMutation) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/plans/mark-as-cancelled`, data);
  },
  markThePlanAsActive(data: IPlanMutation) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/plans/mark-as-active`, data);
  },
  markThePlanAsCompleted(data: IPlanMutation) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/plans/mark-as-completed`, data);
  },
  orderPlansToPatient(data: IOrderPatientPlanRequestData) {
    return axiosInstance.patch<null, IAxiosResponse<null>>(`${baseURL}/v1/plans/order`, data);
  },
  getPatientPlansReadyToOrder(patientId: string) {
    return axiosInstance.get<IReadyToOrderPatientPlanResponse, IAxiosResponse<IReadyToOrderPatientPlanResponse>>(
      `${baseURL}/v1/plans/ready-to-order`,
      {
        params: {
          patientId
        }
      }
    );
  },
  createPatientPlan(data: INewPatientPlan) {
    return axiosInstance.post<null, IAxiosResponse<null>>(`${baseURL}/v1/plans`, data);
  }
};

export default patientEmrManager;
