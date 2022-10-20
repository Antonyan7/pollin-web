import { IUniqueItem } from './reduxTypes/bookingStateTypes';

export interface OptionsReturnProps<T extends IUniqueItem> {
  firstLetter: string;
  item: T;
}

export interface ISingleTemplate {
  id?: string;
  days: number[];
  startTime: string | null;
  endTime: string | null;
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
