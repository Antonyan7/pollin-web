import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, TextField, TextFieldProps } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { futureDate180DaysAfter } from '@utils/dateUtils';

import { IMeasurementListField } from '../../types';

const DateReceivedField = ({ name, control }: IMeasurementListField) => {
  const { field } = useController({
    name,
    control
  });

  const [t] = useTranslation();

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const onDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');

      field.onChange(formattedDate);
    }
  };

  const onDatePickerClose = () => {
    setOpenDatePicker(false);
  };

  const { value, ...otherFieldProps } = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          disableMaskedInput
          maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
          open={openDatePicker}
          onClose={onDatePickerClose}
          label={t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_DATE_RECEIVED)}
          inputFormat="MMM dd, yyyy"
          value={new Date(`${value}`)}
          onChange={(date: Date | null) => onDateChange(date)}
          components={{
            OpenPickerIcon: CalendarIcon
          }}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              disabled
              sx={{ width: '320px' }}
              {...params}
              {...otherFieldProps}
              onClick={() => setOpenDatePicker(true)}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateReceivedField;
