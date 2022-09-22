import { IPagination } from '@axios/axios';

import { ISingleTemplate } from '../create-schedule';

import { IServiceProvider, IServiceType } from './booking';

export interface SchedulingTemplateProps {
  id: string;
  name: string;
  duration: string;
  lastSavedDay: string;
  status: string;
}

export interface IScheduleApplyTemplate {
  duration: string;
  id: string;
  lastSavedDay: string;
  name: string;
  status: string;
}

export interface BlockSchedulingProps {
  resourceId: string;
  startDate: string;
  endDate: string;
  placeholderLabel: string;
  slots?: IServiceProvider[];
}
export interface SingleSchedulingProps {
  name: string;
  timePeriods: ISingleTemplate[];
}
export interface SchedulingProps {
  scheduleApplyTemplates: IScheduleApplyTemplate[];
  scheduleSingleTemplate: SingleSchedulingProps;
  schedulingListLoadingStatus: boolean;
  scheduleTemplates: IScheduleTemplatesList;
  error: Error | null;
  scheduleBlock: BlockSchedulingProps[];
  scheduleCalendarLoading: boolean;
  scheduleResources: IServiceProvider[];
  serviceTypes: IServiceType[];
  applySuccess: boolean;
  blockSuccess: boolean;
}

export interface IScheduleTemplatesList extends IPagination {
  templates: SchedulingTemplateProps[];
}
