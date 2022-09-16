import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

export interface IAxiosResponse<T = any, D = any> {
  data: IData<T>;
  status: IResponseStatus;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
export interface IAxiosResponsePaginated<T> {
  data: IPaginatedData<T>;
  status: IResponseStatus;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

interface IResponseStatus {
  code: string;
}

interface IData<T> extends IResponseStatus {
  data: T;
}

interface IPagination {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

interface IPaginatedData<T extends IPagination> extends IResponseStatus {
  data: T;
}

export interface RequestManagerType {
  axiosInstance: AxiosInstance;
  [key: string]: (...args: any[]) => Promise<any>;
}
export interface ApiType {
  [key: string]: RequestManagerType;
}
