import { SchedulingProps } from 'types/reduxTypes/schedulingStateTypes';

export const defaultScheduleTemplateDetails = { name: '', data: [], message: '', title: '', timePeriods: [] };

export const getInitialState = (): SchedulingProps => ({
  scheduleTemplates: { templates: [], pageSize: 1, currentPage: 1, totalItems: 0 },
  scheduleApplyTemplates: [],
  scheduleSingleTemplate: defaultScheduleTemplateDetails,
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
  scheduleLoading: false,
  isApplyingSchedule: false
});
