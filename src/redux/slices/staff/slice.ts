import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/staff/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'staff',
  initialState: getInitialState(),
  reducers
});

export default slice;
