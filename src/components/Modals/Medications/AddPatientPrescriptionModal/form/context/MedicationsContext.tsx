import { createContext } from 'react';
import { FieldValues, UseFieldArrayReturn } from 'react-hook-form';

export const MedicationsContext = createContext<UseFieldArrayReturn<FieldValues, `medications`, 'id'>>({
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
