import { ITemplateGroup } from '../types/create-schedule';

import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_SCHEDULE_SERVICE_URL;

const schedulingManager = {
  createTemplate(data: ITemplateGroup) {
    return Axios({ baseURL }).post('/clinic-scheduling/v1/templates', data);
  }
};

export default schedulingManager;
