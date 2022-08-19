import { createSlice } from '@reduxjs/toolkit';

import { IScheduleTemplateProps } from '../../types/reduxTypes/schedule-templates';

const initialState: IScheduleTemplateProps = {
  error: []
};

export const scheduleTemplate = createSlice({
  name: 'scheduleTemplate',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = [...state.error, action.payload];
    }
  }
});

export default scheduleTemplate.reducer;
