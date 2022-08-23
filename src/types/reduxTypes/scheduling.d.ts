export interface SchedulingTemplateProps {
  id: string;
  name: string;
  duration: string;
  lastSavedDay: string;
  status: string;
}

export interface SchedulingProps {
  scheduleTemplates: SchedulingTemplateProps[];
  error: Error | null;
}
