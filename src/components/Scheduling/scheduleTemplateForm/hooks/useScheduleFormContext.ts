import { useContext } from 'react';

import { ScheduleFormContext } from '../context';

const useScheduleFormContext = () => {
  const contextValues = useContext(ScheduleFormContext);

  return contextValues;
};

export default useScheduleFormContext;
