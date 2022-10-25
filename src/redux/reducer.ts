import { combineReducers } from 'redux';

import { bookingSlice } from './slices/booking';
import { coreSlice } from './slices/core';
import { patientsSlice } from './slices/patients';
import { schedulingSlice } from './slices/scheduling';
import { testResultsSlice } from './slices/testResults';
import { viewsSlice } from './slices/views';

const reducer = combineReducers({
  core: coreSlice.reducer,
  scheduleTemplates: schedulingSlice.reducer,
  patients: patientsSlice.reducer,
  views: viewsSlice.reducer,
  booking: bookingSlice.reducer,
  testResults: testResultsSlice.reducer
});

export default reducer;
