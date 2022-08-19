import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import { menuSlice } from './slices/menu';
import redirectionReducer from './slices/redirection';

const reducer = combineReducers({
  redirection: redirectionReducer,
  menu: menuSlice.reducer,
  appointments: appointmentsReducer
});

export default reducer;
