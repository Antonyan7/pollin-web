import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { scheduledTemplatesReducer } from './reducers/ScheduledTemplatesReducer';
import { IScheduledTemplatesState, ScheduleTemplatesContextActionTypes } from './types/ScheduledTemplatesContextTypes';

interface IScheduleTemplatesContext {
  selected: string[];
  setSelected: (newValue: string[]) => void;
}

const initialState: IScheduledTemplatesState = {
  selected: []
};

const Context = createContext<IScheduleTemplatesContext>({
  selected: [],
  setSelected: () => ({})
});

export const ScheduleTemplatesContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [scheduledTemplatesState, dispatch] = useReducer(scheduledTemplatesReducer, initialState);
  const { selected } = scheduledTemplatesState;

  const value: IScheduleTemplatesContext = useMemo(
    () => ({
      selected,
      setSelected: (newSelected: string[]) => {
        dispatch({ type: ScheduleTemplatesContextActionTypes.SET_SELECTED, payload: newSelected });
      }
    }),
    [selected]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useScheduleTemplatesContext = () => useContext(Context);
