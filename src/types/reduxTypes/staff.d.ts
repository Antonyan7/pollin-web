import { IPagination } from '@axios/axiosTypes';

export interface IStaffManager {
  isStaffLoading: boolean;
  staff: IStaffProps;
}

export interface IStaffProps extends IPagination {
  staff: IStaff[];
}

export interface IStaff {
  id: string;
  name: string;
}
