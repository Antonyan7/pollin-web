import { IAction, SliceReducers } from 'redux/store';
import { IServiceProvider, IServiceType } from 'types/reduxTypes/booking';
import {
  BlockSchedulingProps,
  SchedulingProps,
  SchedulingTemplateProps,
  SingleSchedulingProps
} from 'types/reduxTypes/scheduling';

const actions: SliceReducers<SchedulingProps> = {
  setError(state, action) {
    state.error = action.payload;
  },
  setServiceTypes(state, action: IAction<IServiceType[]>) {
    // state.serviceTypes = action.payload;
    // TODO: remove this once we can get service types based on usage area
    const filtered = action.payload.filter((item) => item.title !== 'Block');

    state.serviceTypes = filtered;
  },
  setScheduleTemplates(state, action: IAction<SchedulingTemplateProps[]>) {
    state.scheduleTemplates = action.payload;
  },
  setSingleScheduleTemplate(state, action: IAction<SingleSchedulingProps>) {
    state.scheduleSingleTemplate = action.payload;
  },
  setScheduleBlock(state, action: IAction<BlockSchedulingProps[]>) {
    state.scheduleBlock = action.payload;
  },
  setScheduleBlockResources(state, action: IAction<IServiceProvider[]>) {
    state.scheduleResources = action.payload;
  }
};

export default actions;
