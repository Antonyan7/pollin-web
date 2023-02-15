import { IStaffManager } from 'types/reduxTypes/staff';

export const getInitialState = (): IStaffManager => ({
  staff: { staff: [], currentPage: 1, pageSize: 25, totalItems: 0 },
  isStaffLoading: false
});
