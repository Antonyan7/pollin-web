export interface IServiceTypes {
  firstLetter: string;
  title: string;
}

export interface ITemplate {
  id: string;
  days: number[];
  startTime: string;
  endTime: string;
  isServiceType: boolean;
  serviceTypes: string[];
  placeholder: string;
}
