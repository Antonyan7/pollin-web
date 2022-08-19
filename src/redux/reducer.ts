import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import menuReducer from './slices/menu';
import redirectionReducer from './slices/redirection';

const reducer = combineReducers({
  redirection: redirectionReducer,
  menu: menuReducer,
  appointments: appointmentsReducer
});

export default reducer;
