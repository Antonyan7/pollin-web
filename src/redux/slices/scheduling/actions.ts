import { IAction, SliceReducers } from 'redux/store';
import { IServiceProvider } from 'types/reduxTypes/booking';
import { BlockSchedulingProps, SchedulingProps, SchedulingTemplateProps } from 'types/reduxTypes/scheduling';

const actions: SliceReducers<SchedulingProps> = {
  setError(state, action) {
    state.error = action.payload;
  },
  getScheduleTemplates(state, action: IAction<SchedulingTemplateProps[]>) {
    state.scheduleTemplates = action.payload;
  },
  setScheduleBlock(state, action: IAction<BlockSchedulingProps[]>) {
    state.scheduleBlock = action.payload;
  },
  setScheduleBlockResources(state, action: IAction<IServiceProvider[]>) {
    state.scheduleResources = action.payload;
  }
};

export default actions;
