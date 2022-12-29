import { useWatch } from 'react-hook-form';
import { isAllDaysFilled } from 'helpers/scheduling';

import { ScheduleFormFields } from '../types';

const useAddNewScheduleButtonStatus = () => {
  const timePeriods = useWatch({
    name: ScheduleFormFields.TimePeriods
  });

  return isAllDaysFilled(timePeriods);
};

export default useAddNewScheduleButtonStatus;
