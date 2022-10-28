import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/user/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers
});

export default slice;
