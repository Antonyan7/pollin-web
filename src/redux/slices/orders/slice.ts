import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/orders/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'orders',
  initialState: getInitialState(),
  reducers
});

export default slice;
