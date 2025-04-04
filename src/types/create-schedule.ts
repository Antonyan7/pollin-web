import { IUniqueItem, IUniqueItemPatient } from './reduxTypes/bookingStateTypes';

export interface OptionsReturnProps<T extends IUniqueItem> {
  firstLetter: string;
  item: T;
}
export interface OptionsReturnPropsPatient<T extends IUniqueItemPatient> {
  firstLetter: string;
  item: T;
}

export interface ISingleTemplate {
  id?: string;
  days: number[];
  startTime: Date | null;
  endTime: Date | null;
  periodType: PeriodType;
  serviceTypes?: string[]; // exists only when periodType is ServiceType
  placeholderName: string;
}

export interface IApplyScheduleData {
  resourceId: string;
  templateId: string;
  repeatWeeksCount: number;
  startDate: Date | null | string;
  endDate: Date | null | string;
  applyDays: number[];
}

export interface ITemplateGroup {
  name: string;
  timePeriods: ISingleTemplate[];
}

export enum PeriodType {
  ServiceType = 'ServiceType',
  Block = 'Block'
}

export interface ITemplateOverlap {
  data: { title: string; data: number[]; message: string };
}

export enum ScheduleTemplateErrorMessages {
  CreateTemplateOverlapMessage = 'Error: Overlapping Service Types and Blocks',
  EditTemplateOverlapMessage = 'Error: Overlapping Service Types and Blocks'
}
