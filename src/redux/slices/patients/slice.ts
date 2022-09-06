import { createSlice } from '@reduxjs/toolkit';

import actions from './actions';
import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'patients',
  initialState: getInitialState(),
  reducers: actions
});

export default slice;
