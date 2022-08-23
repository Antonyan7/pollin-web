import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import { bookingSlice } from './slices/booking';
import { viewsSlice } from './slices/views';

const reducer = combineReducers({
  views: viewsSlice.reducer,
  appointments: appointmentsReducer,
  booking: bookingSlice.reducer
});

export default reducer;
