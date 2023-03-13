import { createContext } from 'react';

const TestResultsContext = createContext<{ type: string }>({
  type: ''
});

export default TestResultsContext;
