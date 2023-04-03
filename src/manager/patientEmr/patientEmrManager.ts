import * as Sentry from '@sentry/nextjs';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  IAlertDetailsResponse,
  ICreateEncounterAddendumRequest,
  ICreateEncounterNoteRequest,
  IDropdownsResponse,
  IDrugsResponse,
  IEncounterFilterResponse,
  IEncounterResponse,
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
  IGetPatientsRequestBody,
  IGetPatientsResponse,
  IMedicalContactInformation,
  IPatientBackground,
  IPatientContactInformationProps,
  IPatientContactInformationResponse,
  IPatientEncountersListResponse,
  IPatientHighlightDetailsResponse,
  IPatientHighlightResponse,
  IPatientProfileOverviewResponse,
  IPatientProfileResponse,
  IPatientsFiltersResponse,
  IPatientsListResponse,
  IProfileTestResultDetailsReqBody,
  IProfileTestResultDetailsResponse,
  IProfileTestResults,
  ITestResultHistoryResponse,
  IUpdateEncounterAddendumRequest,
  IUpdateEncounterNoteRequest
} from 'manager/patientEmr/managerPatientEmrTypes';
import { CustomAlerts, IEncountersReqBody, IPatientsReqBody } from 'types/patient';
import {
  ICreateMedication,
  IEncounterDetailsResponse,
  ILatestTestResult
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
  getEncounterFilters() {
    return axiosInstance.get<IEncounterFilterResponse, IAxiosResponse<IEncounterFilterResponse>>(
      `${baseURL}/v1/encounters/filters`
    );
  },
  getEncounter(encounterId: string) {
    return axiosInstance.get<IEncounterResponse, IAxiosResponse<IEncounterResponse>>(
      `${baseURL}/v1/encounters/${encounterId}`
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
  getProfileTestResultDetails(patientId: string, params: IProfileTestResultDetailsReqBody) {
    return axiosInstance.get<IProfileTestResultDetailsResponse, IAxiosResponse<IProfileTestResultDetailsResponse>>(
      `${baseURLTestsResults}/v1/profile-test-result/${patientId}/details`,
      {
        params
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
  updatePatientContactInformation(patientId: string, data: IPatientContactInformationProps) {
    return axiosInstance.put<IMedicalContactInformation, IAxiosResponse<IMedicalContactInformation>>(
      `${baseURL}/v1/medical-background/${patientId}/contact-information`,
      {
        contactInformation: data
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
  getDrugs(searchString: string, page: number) {
    return axiosInstance.get<IDrugsResponse, IAxiosResponse<IDrugsResponse>>(
      `${baseURL}/v1/prescriptions/medications/search`,
      {
        params: {
          searchString,
          page
        }
      }
    );
  },
  getMedicationDropdownOptions() {
    return axiosInstance.get<IDropdownsResponse, IAxiosResponse<IDropdownsResponse>>(
      `${baseURL}/v1/prescriptions/dropdown-options`
    );
  },
  createPatientMedication(data: ICreateMedication) {
    return axiosInstance.post<IDropdownsResponse, IAxiosResponse<IDropdownsResponse>>(
      `${baseURL}/v1/prescriptions/medications`,
      data
    );
  }
};

export default patientEmrManager;
