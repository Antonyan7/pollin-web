import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import DefaultMobileDateTimePicker from '@ui-component/common/DefaultMobileDateTimePicker';
import { changeTimezone, getTimezoneOffset } from '@utils/dateUtils';

import { IFormValues } from '../types';

const DateAndStartTime: React.FC = () => {
  const dateFieldName = 'appointment.date';
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const [t] = useTranslation();
  const { control } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({
    name: dateFieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER);
  const dateAndStartTimeLabelCyId = CypressIds.MODAL_APPOINTMENTS_EDIT_TIME_PICKER;

  useEffect(() => {
    if (
      field.value &&
      !(details?.appointment?.date === changeTimezone(field.value as string | Date, getTimezoneOffset()))
    ) {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(false));
    } else {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(true));
    }
  }, [details?.appointment?.date, field.value]);

  return (
    <Grid item xs={12}>
      <DefaultMobileDateTimePicker
        label={dateAndStartTimeLabel}
        data-cy={dateAndStartTimeLabelCyId}
        value={field.value as string}
        onChange={onChange}
        renderInputProps={{
          ...fieldProps
        }}
      />
    </Grid>
  );
};

export default DateAndStartTime;
