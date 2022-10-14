import { createContext } from 'react';

interface ScheduledTemplatesSelectedDispatchContext {
  selected: string[];
  setSelected: (newValue: string[]) => void;
}

export const ScheduledTemplatesListContext = createContext<ScheduledTemplatesSelectedDispatchContext>({
  selected: [],
  setSelected: () => ({})
});
