import { combineReducers } from 'redux';

import menuReducer from './slices/menu';

const reducer = combineReducers({
  menu: menuReducer
});

export default reducer;
