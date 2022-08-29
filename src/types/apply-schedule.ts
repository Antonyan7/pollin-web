export interface IApplyScheduleDay {
  id: number;
  name: string;
}

export interface IAppliedDay {
  dayNum: number;
  dayLabel: string;
}

export enum ScheduleTerms {
  Resource = 'Resource',
  ScheduleTemplate = 'Schedule Template',
  Template = 'Template',
  Repeats = 'Repeats',
  Every = 'Every',
  StartDate = 'Start Date',
  EndDate = 'End Date'
}
