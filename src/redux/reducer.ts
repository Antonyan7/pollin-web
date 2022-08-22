import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import { viewsSlice } from './slices/views';

const reducer = combineReducers({
  views: viewsSlice.reducer,
  appointments: appointmentsReducer
});

export default reducer;
