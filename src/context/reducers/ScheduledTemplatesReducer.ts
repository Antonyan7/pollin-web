import { ScheduledTemplatesContextAction } from '../actions/ScheduledTemplatesContextActions';
import { IScheduledTemplatesState } from '../types/ScheduledTemplatesContextTypes';

export const scheduledTemplatesReducer = (
  state: IScheduledTemplatesState,
  action: ScheduledTemplatesContextAction
): IScheduledTemplatesState => {
  switch (action.type) {
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};
