import reducers from '@redux/slices/plans/reducers';
import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'plans',
  initialState: getInitialState(),
  reducers
});

export default slice;
