import { useContext } from 'react';

import TestResultsContext from '../context/TestResult';

const useTestResultsContext = () => useContext(TestResultsContext);

export default useTestResultsContext;
