import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import { bookingSlice } from './slices/booking';
import { schedulingSlice } from './slices/scheduling';
import { viewsSlice } from './slices/views';

const reducer = combineReducers({
  scheduleTemplates: schedulingSlice.reducer,
  views: viewsSlice.reducer,
  appointments: appointmentsReducer,
  booking: bookingSlice.reducer
});

export default reducer;
