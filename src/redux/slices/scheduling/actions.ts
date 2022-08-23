import { IAction, SliceReducers } from 'redux/store';
import { SchedulingProps, SchedulingTemplateProps } from 'types/reduxTypes/scheduling';

const actions: SliceReducers<SchedulingProps> = {
  setError(state, action: IAction<Error>) {
    state.error = action.payload;
  },
  getScheduleTemplates(state, action: IAction<SchedulingTemplateProps[]>) {
    state.scheduleTemplates = action.payload;
  }
};

export default actions;
