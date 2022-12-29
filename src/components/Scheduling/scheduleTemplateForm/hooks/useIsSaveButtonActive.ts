import { useFormState } from 'react-hook-form';
import { ISingleTemplate } from 'types/create-schedule';

import useScheduleFormContext from './useScheduleFormContext';

const requiredFieldNames = ['days', 'endTime', 'placeholderName', 'startTime'];

const useIsScheduleButtonActive = () => {
  const formState = useFormState();
  const { scheduleId } = useScheduleFormContext();

  // When it's edit schedule check are there any changed field;
  if (scheduleId) {
    return Object.values(formState.dirtyFields).length > 0;
  }

  // Otherwise (create schedule case) pick name and timePeriods from changed fields;
  const { name, timePeriods } = formState.dirtyFields;

  const isNameFilled = !!name;
  const isTimePeriodsFilled =
    timePeriods &&
    // Iterate over all timePeriods and check are all required fields filled
    timePeriods.every((timePeriod: ISingleTemplate) =>
      // If required fields filled (Just check keys)
      requiredFieldNames.every((requiredField) => Object.keys(timePeriod).includes(requiredField))
    );
  const isScheduleSaveButtonActive = isNameFilled && isTimePeriodsFilled;

  return isScheduleSaveButtonActive;
};

export default useIsScheduleButtonActive;
