import { ISingleTemplate } from '../create-schedule';

import { IServiceProvider, IServiceType } from './booking';

export interface SchedulingTemplateProps {
  id: string;
  name: string;
  duration: string;
  lastSavedDay: string;
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
  scheduleSingleTemplate: SingleSchedulingProps;
  scheduleTemplates: SchedulingTemplateProps[];
  error: Error | null;
  scheduleBlock: BlockSchedulingProps[];
  scheduleResources: IServiceProvider[];
  serviceTypes: IServiceType[];
}
