import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

export interface IAxiosResponse<T> {
  data: IData<T>;
  status: IResponseStatus;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<any>;
  request?: any;
}
export interface IAxiosResponsePaginated<T> {
  data: IPaginatedData<T>;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<any>;
  request?: XMLHttpRequest;
}

interface IResponseStatus {
  code: string;
  message?: string;
  title?: string;
}

interface IData<T> extends IResponseStatus {
  data: T;
  status: IResponseStatus;
}

interface IPagination {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

interface IPaginatedData<T> extends IData<T>, IPagination {}
