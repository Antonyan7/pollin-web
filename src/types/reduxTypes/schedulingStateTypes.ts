import { IPagination } from '@axios/axiosTypes';

import { ISingleTemplate } from '../create-schedule';

import { IServiceProvider, IServiceType } from './bookingStateTypes';

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
  data: number[];
  message: string;
  title: string;
  timePeriods: ISingleTemplate[];
}

export interface DeleteScheduleTemplateProps {
  templateIds: string[];
}

export interface SchedulingProps {
  isServiceTypesLoading: boolean;
  scheduleApplyTemplates: IScheduleApplyTemplate[];
  scheduleSingleTemplate: SingleSchedulingProps;
  schedulingListLoadingStatus: boolean;
  scheduleTemplates: IScheduleTemplatesList;
  isApplyingSchedule: boolean;
  overrides: number[];
  scheduleBlock: BlockSchedulingProps;
  scheduleCalendarLoading: boolean;
  scheduleResources: IServiceProvider[];
  serviceTypes: IServiceType[];
  scheduleLoading: boolean;
}

export interface IScheduleTemplatesList extends IPagination {
  templates: SchedulingTemplateProps[];
}
