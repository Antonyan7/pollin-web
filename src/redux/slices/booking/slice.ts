import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/booking/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'booking',
  initialState: getInitialState(),
  reducers
});

export default slice;
