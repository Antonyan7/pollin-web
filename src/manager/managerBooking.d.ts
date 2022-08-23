import { IAppointment, IServiceProvider } from '../types/reduxTypes/booking';

export interface IAppointmentListReqParams {
  resourceId: string;
  date: string;
}

export interface IAppointmentListResponse {
  slots: IAppointment[];
}

export interface IServiceProvidersListResponse {
  providers: IServiceProvider[];
}
