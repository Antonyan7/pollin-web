import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/testResults/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'testResults',
  initialState: getInitialState(),
  reducers
});

export default slice;
