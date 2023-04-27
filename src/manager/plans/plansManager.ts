import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import {
  INewPatientPlan,
  IOrderPatientPlanRequestData,
  IPatientPlanDetails,
  IPatientPlanDetailsReq,
  IPatientPlansCategoriesAndTypesResponse,
  IPatientPlansListData,
  IPatientPlansStatusResponse,
  IPlanMutation,
  IReadyToOrderPatientPlanResponse
} from 'types/reduxTypes/plansTypes';

const baseURL = '/clinic-plans';
const axiosInstance = Axios();

const plansManager = {
  axiosInstance,
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
      `${baseURL}/v1/plans/statuses`
    );
  },
  getPlanCategoriesAndTypes() {
    return axiosInstance.get<
      IPatientPlansCategoriesAndTypesResponse,
      IAxiosResponse<IPatientPlansCategoriesAndTypesResponse>
    >(`${baseURL}/v1/plans/categories-plan-types`);
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
  },
  getPatientPlanDetails(planId: string) {
    return axiosInstance.get<IPatientPlanDetailsReq, IAxiosResponse<IPatientPlanDetails>>(
      `${baseURL}/v1/plans/${planId}`,
      {}
    );
  }
};

export default plansManager;
