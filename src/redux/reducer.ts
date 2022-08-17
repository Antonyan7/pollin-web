import { combineReducers } from 'redux';

import appointmentsReducer from './slices/appointments';
import menuReducer from './slices/menu';

const reducer = combineReducers({
  menu: menuReducer,
  appointments: appointmentsReducer
});

export default reducer;
