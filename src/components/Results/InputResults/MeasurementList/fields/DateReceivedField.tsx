import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import EventIcon from '@mui/icons-material/Event';
import { Stack, TextField, TextFieldProps } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Translation } from 'constants/translations';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { futureDate180DaysAfter } from '@utils/dateUtils';

import { IMeasurementListField } from '../../types';

const DateReceivedField = ({ name, control }: IMeasurementListField) => {
  const { field } = useController({
    name,
    control
  });

  const [t] = useTranslation();
  const [isDatePickerFocused, setIsDatePickerFocused] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { value, ...otherFieldProps } = field;

  const onDateChange = (date: Date | null) => {
    if (date) {
      field.onChange(date);
    }
  };

  const onDatePickerClose = () => {
    setOpenDatePicker(false);
    setIsDatePickerFocused(false);
  };

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
          value={value ?? null}
          onChange={(date: Date | null) => onDateChange(date)}
          components={{
            OpenPickerIcon: CalendarIcon
          }}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              disabled
              sx={{ width: '320px', svg: { color: (theme) => theme.palette.primary.main } }}
              {...params}
              {...otherFieldProps}
              onClick={() => {
                setIsDatePickerFocused(true);
                setOpenDatePicker(true);
              }}
              focused={isDatePickerFocused}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              InputProps={{
                ...params.InputProps,
                placeholder: 'mm:dd:yyyy',
                endAdornment: <EventIcon />
              }}
              /* Mui TextField has two params with similar name inputProps & InputProps */
              // eslint-disable-next-line react/jsx-no-duplicate-props
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateReceivedField;
