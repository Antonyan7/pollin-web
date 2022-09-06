import { IApplyScheduleData, ITemplateGroup } from 'types/create-schedule';
import { IServiceType } from 'types/reduxTypes/booking';
import { BlockSchedulingProps, SchedulingTemplateProps, SingleSchedulingProps } from 'types/reduxTypes/scheduling';

import { IAxiosResponse } from './axios';
import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_SCHEDULE_SERVICE_URL;

const axiosInstance = Axios({ baseURL });

const schedulingManager = {
  createTemplate(data: ITemplateGroup) {
    return axiosInstance.post<any, IAxiosResponse<void>>('/v1/templates', data);
  },
  getTemplatesList() {
    return axiosInstance.get<any, IAxiosResponse<SchedulingTemplateProps[]>>('/v1/templates');
  },
  deleteTemplate(data: string[]) {
    return axiosInstance.delete<any, IAxiosResponse<void>>('/v1/templates/delete', { data });
  },
  getSingleTemplate(templateId: string) {
    return axiosInstance.get<any, IAxiosResponse<SingleSchedulingProps>>('/v1/templates', {
      params: { templateId }
    });
  },
  applyScheduleBlock(data: BlockSchedulingProps) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>('/v1/block/apply', data);
  },
  applyScheduleTemplate(data: IApplyScheduleData) {
    return axiosInstance.post<any, IAxiosResponse<IServiceType[]>>('/v1/templates/apply', data);
  }
};

export default schedulingManager;
