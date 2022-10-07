export const getInitialState = () => ({
  scheduleTemplates: { templates: [], pageSize: 1, currentPage: 1, totalItems: 0 },
  scheduleApplyTemplates: [],
  error: null,
  scheduleSingleTemplate: { name: '', timePeriods: [] },
  schedulingListLoadingStatus: false,
  scheduleBlock: [],
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
  }
});
