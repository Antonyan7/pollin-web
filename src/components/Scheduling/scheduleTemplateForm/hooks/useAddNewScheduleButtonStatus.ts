import { useWatch } from 'react-hook-form';
import { areAllDaysFilled } from 'helpers/scheduling';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';

import { ScheduleFormFields } from '../types';

const useAddNewScheduleButtonStatus = () => {
  const { WORKING_WEEK_DURATION } = useClinicConfig();
  const timePeriods = useWatch({
    name: ScheduleFormFields.TimePeriods
  });

  return areAllDaysFilled(timePeriods, WORKING_WEEK_DURATION);
};

export default useAddNewScheduleButtonStatus;
