import React, { useCallback, useState } from 'react';
import { TextField, useTheme } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { TimePicker } from '@mui/x-date-pickers';
import { CypressIds } from 'constants/cypressIds';
import { TimePickerWrapperProps } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import { timeOnlyDisplayFormat } from '@utils/date/DateUtil';

const TimePickerWrapper = ({
  value,
  onChange,
  label,
  errorMessage,
  isError,
  dataCyId,
  ...otherProps
}: TimePickerWrapperProps) => {
  const theme = useTheme();
  const { MIN_SELECTABLE_DATE_TIME, MAX_SELECTABLE_DATE_TIME, fitSelectedTimeToConfig } = useClinicConfig();
  const { isLimitedByWorkingHours } = otherProps;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLimitationConfig = useCallback(
    (date: Date | null) => (isLimitedByWorkingHours && date ? (fitSelectedTimeToConfig(date) as Date) : date),
    [isLimitedByWorkingHours, fitSelectedTimeToConfig]
  );

  return (
    <TimePicker
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      minutesStep={10}
      ampm={false}
      inputFormat={timeOnlyDisplayFormat}
      label={label}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      value={handleLimitationConfig(value)}
      onChange={(date) => onChange(handleLimitationConfig(date))}
      renderInput={(params: MuiTextFieldPropsType) => (
        <TextField
          fullWidth
          sx={{
            svg: { color: theme.palette.primary.main },
            'caret-color': 'transparent'
          }}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setIsOpen(true)}
          data-cy={dataCyId ?? CypressIds.COMMON_TIME_PICKER}
          {...params}
          error={isError}
          helperText={errorMessage ?? ''}
        />
      )}
      {...otherProps}
    />
  );
};

export default TimePickerWrapper;
