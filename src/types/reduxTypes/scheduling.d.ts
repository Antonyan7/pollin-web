import { IServiceProvider } from './booking';

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
export interface SchedulingProps {
  scheduleTemplates: SchedulingTemplateProps[];
  error: Error | null;
  scheduleBlock: BlockSchedulingProps[];
  scheduleResources: IServiceProvider[];
}
