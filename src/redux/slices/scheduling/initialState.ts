export const getInitialState = () => ({
  scheduleTemplates: { templates: [], pageSize: 1, currentPage: 1, totalItems: 0 },
  scheduleApplyTemplates: [],
  error: null,
  scheduleSingleTemplate: { name: '', timePeriods: [] },
  scheduleBlock: [],
  scheduleResources: [],
  serviceTypes: [],
  success: false
});
