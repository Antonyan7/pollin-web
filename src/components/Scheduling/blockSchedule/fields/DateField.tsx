import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { toRoundupTime } from 'helpers/time';

import DefaultMobileDateTimePicker from '@ui-component/common/DefaultMobileDateTimePicker';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

type DateAndStartTimeType = Date | null;
type ErrorMessageType = string | null;

const DateField = ({ fieldName }: IFieldRowProps) => {
  const { control, formState, getValues, clearErrors } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;
  const [t] = useTranslation();
  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const startDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_START_DATE_ERROR);
  const endDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_END_DATE_ERROR);
  const startBeforeEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_BEFORE_END_ERROR);
  const startAfterEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_AFTER_END_ERROR);
  const startTime = new Date(getValues('startDate') as Date).getTime();
  const endTime = new Date(getValues('endDate') as Date).getTime();
  const showDateError = (message: string) => {
    setErrorMessage(message);
    setShowErrorMessage(true);
  };
  const clearDateError = () => {
    setErrorMessage(null);
    setShowErrorMessage(false);
  };

  useEffect(() => {
    switch (errors[fieldName]?.type) {
      case 'required':
        if (fieldName === 'startDate') {
          showDateError(startDateErrorMessage);
        } else {
          showDateError(endDateErrorMessage);
        }

        break;
      case 'max':
        showDateError(startBeforeEndMessage);

        if (startTime < endTime) {
          clearDateError();
        }

        break;
      case 'min':
        showDateError(startAfterEndMessage);

        if (endTime > startTime) {
          clearDateError();
        }

        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, endTime, startTime, errors.startDate, errors.endDate, fieldName, t, errors, getValues]);

  const initialValue: DateAndStartTimeType = toRoundupTime(value);

  return (
    <Grid item xs={12}>
      <DefaultMobileDateTimePicker
        toolbarFormat="yyyy, MMM dd"
        label={
          fieldName === 'startDate'
            ? t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START)
            : t(Translation.PAGE_SCHEDULING_BLOCK_DATE_END)
        }
        value={initialValue}
        onChange={onChange}
        renderInputProps={{
          ...fieldProps,
          helperText: errors[fieldName]?.message && errorMessage,
          error: Boolean(errors[fieldName]?.message) && showErrorMessage
        }}
      />
    </Grid>
  );
};

export default DateField;
