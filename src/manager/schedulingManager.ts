import { ITemplateGroup } from '../types/create-schedule';

import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_SCHEDULE_SERVICE_URL;

const axiosInstance = Axios({ baseURL });

const schedulingManager = {
  createTemplate(data: ITemplateGroup) {
    return axiosInstance.post<any, void>('/clinic-scheduling/v1/templates', data);
  }
};

export default schedulingManager;
