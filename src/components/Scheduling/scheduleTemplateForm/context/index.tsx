import { createContext } from 'react';
import { FieldValues, UseFieldArrayReturn } from 'react-hook-form';

import { ScheduleFormFields } from '../types';

export const ScheduleFormContext = createContext({
  scheduleId: ''
});

export const TimePeriodsFieldsContext = createContext<
  UseFieldArrayReturn<FieldValues, ScheduleFormFields.TimePeriods, 'id'>
>({
  move: () => {},
  fields: [],
  swap(): void {},
  prepend(): void {},
  append(): void {},
  remove(): void {},
  insert(): void {},
  update(): void {},
  replace(): void {}
});
