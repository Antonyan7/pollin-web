import { ITasksListReqBody, ITasksStatusesResponse } from '@axios/tasks/tasksManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import { ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const baseURL = '/clinic-tasks';

const axiosInstance = Axios();

const resultsManager = {
  axiosInstance,
  getTasksList(data: ITasksListReqBody) {
    return axiosInstance.post<ITasksProps, IAxiosResponsePaginated<ITasksProps>>(`${baseURL}/v1/tasks`, data);
  },
  getTaskStatuses() {
    return axiosInstance.get<ITasksStatusesResponse, IAxiosResponse<ITasksStatusesResponse>>(
      `${baseURL}/v1/tasks/statuses`
    );
  }
};

export default resultsManager;
