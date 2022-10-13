import { SchedulingTemplateProps } from 'types/reduxTypes/scheduling';

export interface IScheduleTemplatesListResponse {
  templates: SchedulingTemplateProps[];
}

export interface IScheduleTemplatesCreateResponse {
  data: number[];
  message: string;
  title: string;
  code: string;
}
