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

export interface DeleteScheduleTemplateProps {
  templateIds: string[];
}

export interface SchedulingStateStatusProps {
  success: boolean;
  fail: boolean;
}
export interface SchedulingProps {
  scheduleApplyTemplates: IScheduleApplyTemplate[];
  scheduleSingleTemplate: SingleSchedulingProps;
  schedulingListLoadingStatus: boolean;
  scheduleTemplates: IScheduleTemplatesList;
  error: Error | null;
  overrides: number[];
  scheduleBlock: BlockSchedulingProps;
  scheduleCalendarLoading: boolean;
  scheduleResources: IServiceProvider[];
  serviceTypes: IServiceType[];
  applyScheduleStateStatus: SchedulingStateStatusProps;
  blockScheduleStateStatus: SchedulingStateStatusProps;
  scheduleLoading: boolean;
}

export interface IScheduleTemplatesList extends IPagination {
  templates: SchedulingTemplateProps[];
}
