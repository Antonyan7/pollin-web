import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from 'redux/store';
import { IServiceProvider, IServiceType } from 'types/reduxTypes/bookingStateTypes';
import {
  BlockSchedulingProps,
  IScheduleTemplatesList,
  SchedulingProps,
  SchedulingStateStatusProps,
  SchedulingTemplateProps,
  SingleSchedulingProps
} from 'types/reduxTypes/schedulingStateTypes';

const createReducer = <T extends SliceCaseReducers<SchedulingProps>>(reducer: T) => ({ ...reducer });

const reducers = createReducer({
  setError(state, action) {
    state.error = action.payload;
  },
  setServiceTypes(state, action: IAction<IServiceType[]>) {
    // state.serviceTypes = action.payload;
    // TODO: remove this once we can get service types based on usage area
    state.serviceTypes = action.payload.filter((item) => item.title !== 'Block');
  },
  setScheduleTemplates(state, action: IAction<IScheduleTemplatesList>) {
    state.scheduleTemplates = action.payload;
  },
  setCalendarLoadingState(state, action: IAction<boolean>) {
    state.scheduleCalendarLoading = action.payload;
  },
  setScheduleApplyTemplates(state, action: IAction<SchedulingTemplateProps[]>) {
    state.scheduleApplyTemplates = action.payload;
  },
  setSingleScheduleTemplate(state, action: IAction<SingleSchedulingProps>) {
    state.scheduleSingleTemplate = action.payload;
  },
  setScheduleBlock(state, action: IAction<BlockSchedulingProps>) {
    state.scheduleBlock = action.payload;
  },
  setScheduleBlockResources(state, action: IAction<IServiceProvider[]>) {
    state.scheduleResources = action.payload;
  },
  setSchedulingListLoadingStatus(state, action: IAction<boolean>) {
    state.schedulingListLoadingStatus = action.payload;
  },
  setApplyScheduleState(state, action: IAction<SchedulingStateStatusProps>) {
    state.applyScheduleStateStatus = action.payload;
  },
  setBlockScheduleState(state, action: IAction<SchedulingStateStatusProps>) {
    state.blockScheduleStateStatus = action.payload;
  },
  setScheduleOverrides(state, action: IAction<number[]>) {
    state.overrides = action.payload;
  },
  setScheduleLoading(state, action: IAction<boolean>) {
    state.scheduleLoading = action.payload;
  }
});

export default reducers;
