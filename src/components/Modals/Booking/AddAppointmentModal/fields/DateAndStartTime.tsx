import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { PollinDatePickerType } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { control, formState, getValues } = useFormContext<ICreateAppointmentBody>();
  const { errors } = formState;
  const [t] = useTranslation();
  const actualDate = getValues('date');
  const { fitSelectedTimeToConfig } = useClinicConfig();
  const fixedValue: DateAndStartTimeType = actualDate ? (fitSelectedTimeToConfig(actualDate as Date) as Date) : null;
  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER);
  const dateAndStartTimeCyId = CypressIds.MODAL_APPOINTMENTS_ADD_DATE_AND_START_TIME;
  const dateAndStartTimeDialogCyId = CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG;
  const dateAndStartTimeDialogComponentCyId = CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT;
  const dateFieldName = 'date';

  const { field } = useController({
    name: dateFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;

  const formattedParams = {
    inputProps: {
      'data-cy': dateAndStartTimeCyId
    }
  };

  return (
    <Grid item xs={12}>
      <PollinDatePicker
        type={PollinDatePickerType.DateTime}
        pickerConfigs={{
          DialogProps: {
            PaperProps: {
              'data-cy': dateAndStartTimeDialogComponentCyId
            },
            'data-cy': dateAndStartTimeDialogCyId
          },
          renderInputProps: {
            ...fieldProps
          },
          ...formattedParams,
          label: dateAndStartTimeLabel,
          value: fixedValue,
          onChange,
          disablePast: true,
          errorMessage: errors?.date?.message,
          isError: !!errors?.date?.message
        }}
      />
    </Grid>
  );
};

export default DateAndStartTime;
