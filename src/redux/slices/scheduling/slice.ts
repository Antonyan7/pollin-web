import { createSlice } from '@reduxjs/toolkit';

import actions from './actions';
import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'scheduling',
  initialState: getInitialState(),
  reducers: actions
});

export default slice;
