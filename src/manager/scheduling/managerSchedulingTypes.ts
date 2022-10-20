import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

export interface IScheduleTemplatesListResponse {
  templates: SchedulingTemplateProps[];
}

export interface IScheduleTemplatesCreateResponse {
  data: number[];
  message: string;
  title: string;
  code: string;
}
