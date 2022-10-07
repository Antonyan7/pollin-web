import { createSlice } from '@reduxjs/toolkit';
import reducers from 'redux/slices/patients/reducers';

import { getInitialState } from './initialState';

const slice = createSlice({
  name: 'patients',
  initialState: getInitialState(),
  reducers
});

export default slice;
