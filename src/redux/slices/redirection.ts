// types
import { createSlice } from '@reduxjs/toolkit';
import { RedirectionProps } from 'types/reduxTypes/redirection';

// initial state
const initialState: RedirectionProps = {
  path: '/',
  params: '',
  apply: false
};

// ==============================|| SLICE - REDIRECTION ||============================== //

const redirection = createSlice({
  name: 'redirection',
  initialState,
  reducers: {
    setRedirection(state, action) {
      state.path = action.payload.path;
      state.params = action.payload.params;
      state.apply = action.payload.apply;
    }
  }
});

export default redirection.reducer;

export const { setRedirection } = redirection.actions;
