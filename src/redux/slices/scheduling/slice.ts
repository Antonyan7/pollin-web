import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './initialState';
import reducers from './reducers';

const slice = createSlice({
  name: 'scheduling',
  initialState: getInitialState(),
  reducers
});

export default slice;
