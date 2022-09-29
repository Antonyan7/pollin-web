import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';
import { BlockSchedulingProps, DeleteScheduleTemplateProps, SingleSchedulingProps } from 'types/reduxTypes/scheduling';

import { IAxiosResponse, IAxiosResponsePaginated } from './axios';
import { Axios } from './axiosInstance';
import { IScheduleTemplatesListResponse } from './managerScheduling';

const baseURL = '/clinic-scheduling';

const axiosInstance = Axios();

const schedulingManager = {
  axiosInstance,
  createTemplate(data: ITemplateGroup) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/templates`, data);
  },
  getTemplatesList(pageSize: number) {
    return axiosInstance.get<any, IAxiosResponsePaginated<IScheduleTemplatesListResponse>>(`${baseURL}/v1/templates`, {
      params: { page: pageSize }
    });
  },
  deleteTemplate(data: DeleteScheduleTemplateProps) {
    return axiosInstance.delete<any, IAxiosResponse<void>>(`${baseURL}/v1/templates`, { data });
  },
  getSingleTemplate(templateId: string) {
    return axiosInstance.get<any, IAxiosResponse<SingleSchedulingProps>>(`${baseURL}/v1/templates/${templateId}`);
  },
  updateSingleTemplate(templateId: string, data: ITemplateGroup) {
    return axiosInstance.put<any, IAxiosResponse<SingleSchedulingProps>>(`${baseURL}/v1/templates/${templateId}`, data);
  },
  applyScheduleBlock(data: BlockSchedulingProps) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>(`${baseURL}/v1/block/apply`, data);
  },
  applyScheduleTemplate(data: IApplyScheduleData) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>(`${baseURL}/v1/templates/apply`, data);
  }
};

export default schedulingManager;
