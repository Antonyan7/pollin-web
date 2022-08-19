export interface IServiceTypes {
  firstLetter: string;
  title: string;
}

export interface ISingleTemplate {
  id?: string;
  days: number[];
  startTime: string;
  endTime: string;
  periodType: string;
  serviceTypes: string[];
  placeholderName: string;
}

export interface ITemplateGroup {
  name: string;
  timePeriods: ISingleTemplate[];
}

export enum ServiceTypeOrBlock {
  ServiceType = 'ServiceType',
  Block = 'Block'
}
