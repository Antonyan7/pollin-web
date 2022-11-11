import { SchedulingProps } from 'types/reduxTypes/schedulingStateTypes';

export const getInitialState = (): SchedulingProps => ({
  scheduleTemplates: { templates: [], pageSize: 1, currentPage: 1, totalItems: 0 },
  scheduleApplyTemplates: [],
  error: null,
  scheduleSingleTemplate: { name: '', data: [], message: '', title: '', timePeriods: [] },
  schedulingListLoadingStatus: false,
  scheduleBlock: {
    endDate: '',
    slots: [],
    resourceId: '',
    startDate: '',
    placeholderLabel: ''
  },
  isServiceTypesLoading: false,
  scheduleCalendarLoading: false,
  scheduleResources: [],
  overrides: [],
  serviceTypes: [],
  applyScheduleStateStatus: {
    success: false,
    fail: false
  },
  blockScheduleStateStatus: {
    success: false,
    fail: false
  },
  scheduleLoading: false
});
