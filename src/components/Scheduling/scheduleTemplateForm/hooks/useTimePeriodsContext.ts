import { useContext } from 'react';

import { TimePeriodsFieldsContext } from '../context';

const useTimePeriodsContext = () => {
  const timePeriodMethods = useContext(TimePeriodsFieldsContext);

  return timePeriodMethods;
};

export default useTimePeriodsContext;
