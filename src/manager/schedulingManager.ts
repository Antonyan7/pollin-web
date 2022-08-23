import { SchedulingTemplateProps } from 'types/reduxTypes/scheduling';

import { ITemplateGroup } from '../types/create-schedule';

import { IAxiosResponse } from './axios';
import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_SCHEDULE_SERVICE_URL;

const axiosInstance = Axios({ baseURL });

const schedulingManager = {
  createTemplate(data: ITemplateGroup) {
    return axiosInstance.post<any, void>('/clinic-scheduling/v1/templates', data);
  },
  getTemplatesList() {
    return axiosInstance.get<any, IAxiosResponse<SchedulingTemplateProps[]>>('/clinic-scheduling/v1/templates');
  }
};

export default schedulingManager;
