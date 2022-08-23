import { IAxiosResponse } from '@axios/axios';
import {
  IAppointmentListReqParams,
  IAppointmentListResponse,
  IServiceProvidersListResponse
} from '@axios/managerBooking';

import Axios from './axiosInstance';

const baseURL = process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL;

const axiosInstance = Axios({ baseURL });
const bookingManager = {
  getAppointments(params: IAppointmentListReqParams) {
    return axiosInstance.get<any, IAxiosResponse<IAppointmentListResponse>>('/v1/calendar/slot', { params });
  },
  getServiceProviders() {
    return axiosInstance.get<any, IAxiosResponse<IServiceProvidersListResponse>>('/v1/provider');
  }
};

export default bookingManager;
