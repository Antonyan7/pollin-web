import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/tasks/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'results',
  initialState: getInitialState(),
  reducers
});

export default slice;
