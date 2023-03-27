import React, { useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

interface ITimeFieldProps {
  index: number;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
  dataCy?: string;
}

const TimeField = ({ index, fieldLabel, fieldName, dataCy }: ITimeFieldProps) => {
  const [t] = useTranslation();
  const { control, clearErrors, setError, formState } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, ...fieldProps } = field;

  const { errors } = formState;

  // Choose opposite time field for current time field;
  const watchedFieldName = fieldName === 'endTime' ? 'startTime' : 'endTime';

  const watchedTimeFieldValue = useWatch({
    name: `timePeriods.${index}.${watchedFieldName}`
  });

  const startBeforeEndErrorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_BEFORE_END_ERROR);
  const endBeforeStartErrorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_AFTER_ERROR);

  const startTimeFieldValue = fieldName === 'startTime' ? field.value : watchedTimeFieldValue;
  const endTimeFieldValue = fieldName === 'endTime' ? field.value : watchedTimeFieldValue;

  const getStartTimeValue = startTimeFieldValue ?? '';
  const getEndTimeValue = endTimeFieldValue ?? '';
  const isStartTimeAfterEndTime = getStartTimeValue && getEndTimeValue && getStartTimeValue >= getEndTimeValue;

  useEffect(() => {
    if (isStartTimeAfterEndTime) {
      if (fieldName === 'startTime' && !errors?.timePeriods?.[index]?.startTime?.message) {
        setError(`timePeriods.${index}.startTime`, {
          type: 'invalidTime',
          message: startBeforeEndErrorMessage
        });
      } else if (!errors?.timePeriods?.[index]?.endTime?.message) {
        setError(`timePeriods.${index}.endTime`, {
          type: 'invalidTime',
          message: endBeforeStartErrorMessage
        });
      }
    } else if (errors?.timePeriods?.[index]?.endTime?.message) {
      clearErrors(`timePeriods.${index}.endTime`);
    } else if (errors?.timePeriods?.[index]?.startTime?.message) {
      clearErrors(`timePeriods.${index}.startTime`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartTimeAfterEndTime, watchedTimeFieldValue]);

  const initialValue = field.value ?? null;

  const formattedParams = {
    inputProps: {
      'data-cy': dataCy,
      placeholder: '--:--'
    }
  };

  return (
    <div className="schedule-inputs">
      <PollinDatePicker
        type={PollinDatePickerType.Time}
        pickerConfigs={{
          inputRef: field.ref,
          label: fieldLabel,
          onChange,
          value: initialValue,
          renderInputProps: {
            ...fieldProps
          },
          ...formattedParams,
          isLimitedByWorkingHours: true,
          errorMessage: errors?.timePeriods?.[index]?.[fieldName]?.message,
          isError: !!errors?.timePeriods?.[index]?.[fieldName]?.message
        }}
      />
    </div>
  );
};

export default TimeField;
