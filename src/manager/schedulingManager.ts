import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';
import { BlockSchedulingProps, SchedulingTemplateProps, SingleSchedulingProps } from 'types/reduxTypes/scheduling';

import { IAxiosResponse } from './axios';
import { Axios } from './axiosInstance';

const baseURL = '/clinic-scheduling';

const axiosInstance = Axios();

const schedulingManager = {
  createTemplate(data: ITemplateGroup) {
    return axiosInstance.post<any, IAxiosResponse<void>>(`${baseURL}/v1/templates`, data);
  },
  getTemplatesList(pageSize: number) {
    return axiosInstance.get<any, IAxiosResponse<SchedulingTemplateProps[]>>(`${baseURL}/v1/templates`, {
      params: { page: pageSize }
    });
  },
  deleteTemplate(data: string[]) {
    return axiosInstance.delete<any, IAxiosResponse<void>>(`${baseURL}/v1/templates/delete`, { data });
  },
  getSingleTemplate(templateId: string) {
    return axiosInstance.get<any, IAxiosResponse<SingleSchedulingProps>>(`${baseURL}/v1/templates/${templateId}`);
  },
  applyScheduleBlock(data: BlockSchedulingProps) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>(`${baseURL}/v1/block/apply`, data);
  },
  applyScheduleTemplate(data: IApplyScheduleData) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>(`${baseURL}/v1/templates/apply`, data);
  }
};

export default schedulingManager;
