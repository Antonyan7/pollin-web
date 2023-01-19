import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { toRoundupTime } from 'helpers/time';

import DefaultMobileDateTimePicker from '@ui-component/common/DefaultMobileDateTimePicker';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { control, formState, getValues } = useFormContext<ICreateAppointmentBody>();
  const { errors } = formState;
  const [t] = useTranslation();
  const actualDate = getValues('date');
  const initialDate: DateAndStartTimeType = toRoundupTime(actualDate);
  const dateFieldName = 'date';

  const { field } = useController({
    name: dateFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;

  return (
    <Grid item xs={12}>
      <DefaultMobileDateTimePicker
        toolbarFormat="yyyy, MMM dd"
        label={t(Translation.MODAL_PATIENT_APPOINTMENTS_SELECT_TIME_PICKER)}
        value={initialDate}
        onChange={onChange}
        renderInputProps={{
          ...fieldProps,
          helperText: errors?.date?.message,
          error: !!errors?.date?.message
        }}
      />
    </Grid>
  );
};

export default DateAndStartTime;
