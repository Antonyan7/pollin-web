import React, { useCallback, useState } from 'react';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import { styled, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CypressIds } from 'constants/cypressIds';
import { DatePickerWrapperProps } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import { dateOnlyDisplayFormat } from '@utils/date/DateUtil';

const CalendarPopupIcon = styled(CalendarTodayTwoTone)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const DatePickerWrapper = ({
  value,
  onChange,
  label,
  errorMessage,
  isError,
  dataCyId,
  inputRef,
  ...otherProps
}: DatePickerWrapperProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { futureDate180DaysLimit } = useClinicConfig();

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DatePicker
      disableMaskedInput
      maxDate={futureDate180DaysLimit}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      inputFormat={dateOnlyDisplayFormat}
      value={value}
      label={label}
      onChange={onChange}
      components={{
        OpenPickerIcon: CalendarPopupIcon
      }}
      renderInput={(params) => (
        <TextField
          inputRef={inputRef}
          disabled
          fullWidth
          {...params}
          onClick={() => onOpen()}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
          data-cy={dataCyId ?? CypressIds.COMMON_DATE_PICKER}
          error={isError}
          helperText={errorMessage ?? ''}
        />
      )}
      {...otherProps}
    />
  );
};

export default DatePickerWrapper;
