import { createContext } from 'react';

const defaultContext: Record<string, boolean> = {};

export const FlagsContext = createContext(defaultContext);
