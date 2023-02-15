import { IStaffRequestBody } from '@axios/staff/staffManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponsePaginated } from 'manager/axiosTypes';
import { IStaffProps } from 'types/reduxTypes/staff';

const baseURL = '/clinic-users';

const axiosInstance = Axios();

const staffManager = {
  axiosInstance,
  getStaffList(data: IStaffRequestBody) {
    return axiosInstance.post<IStaffProps, IAxiosResponsePaginated<IStaffProps>>(
      `${baseURL}/v1/staff-users/names`,
      data
    );
  }
};

export default staffManager;
