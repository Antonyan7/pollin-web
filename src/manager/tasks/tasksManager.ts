import {
  ITaskCreateReqBody,
  ITasksListReqBody,
  ITasksPrioritiesResponse,
  ITasksStatusesResponse
} from '@axios/tasks/tasksManagerTypes';
import { Axios } from 'manager/axiosInstance';
import { IAxiosResponse, IAxiosResponsePaginated } from 'manager/axiosTypes';
import { ITaskCreateProps,ITasksDetailsProps, ITasksProps } from 'types/reduxTypes/tasksStateTypes';

const baseURL = '/clinic-tasks';

const axiosInstance = Axios();

const resultsManager = {
  axiosInstance,
  getTaskDetails(taskId: string) {
    return axiosInstance.get<ITasksDetailsProps, IAxiosResponsePaginated<ITasksDetailsProps>>(
      `${baseURL}/v1/tasks/${taskId}`
    );
  },
  getTasksList(data: ITasksListReqBody) {
    return axiosInstance.post<ITasksProps, IAxiosResponsePaginated<ITasksProps>>(`${baseURL}/v1/tasks/list`, data);
  },
  createTask(data: ITaskCreateReqBody) {
    return axiosInstance.post<ITaskCreateProps, IAxiosResponse<ITaskCreateProps>>(`${baseURL}/v1/tasks`, data);
  },
  updateTaskStatus(rowId: string, statusId: string) {
    return axiosInstance.patch<ITasksStatusesResponse, IAxiosResponse<ITasksStatusesResponse>>(
      `${baseURL}/v1/tasks/${rowId}/update-status`,
      {
        statusId
      }
    );
  },
  getTaskStatuses() {
    return axiosInstance.get<ITasksStatusesResponse, IAxiosResponse<ITasksStatusesResponse>>(
      `${baseURL}/v1/tasks/statuses`
    );
  },
  getTaskPriorities() {
    return axiosInstance.get<ITasksPrioritiesResponse, IAxiosResponse<ITasksPrioritiesResponse>>(
      `${baseURL}/v1/tasks/priorities`
    );
  }
};

export default resultsManager;
