import { ScheduleTemplatesContextActionTypes } from '../types/ScheduledTemplatesContextTypes';

export interface ISelectedAction {
  type: typeof ScheduleTemplatesContextActionTypes.SET_SELECTED;
  payload: string[];
}

export type ScheduledTemplatesContextAction = ISelectedAction;
