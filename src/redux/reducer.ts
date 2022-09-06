import { combineReducers } from 'redux';

import { bookingSlice } from './slices/booking';
import { patientsSlice } from './slices/patients';
import { schedulingSlice } from './slices/scheduling';
import { viewsSlice } from './slices/views';

const reducer = combineReducers({
  scheduleTemplates: schedulingSlice.reducer,
  patients: patientsSlice.reducer,
  views: viewsSlice.reducer,
  booking: bookingSlice.reducer
});

export default reducer;
