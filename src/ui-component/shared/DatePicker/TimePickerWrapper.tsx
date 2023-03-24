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
      PopperProps={{
        sx: {
          '& > div > div > div > div > div + div > div': {
            '& .MuiClockNumber-root': {
              color: theme.palette.primary[800]
            },
            '& .Mui-disabled': {
              color: theme.palette.primary[200]
            },
            '& .Mui-selected': {
              color: theme.palette.secondary.light
            }
          }
        }
      }}
      label={label}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      DialogProps={{
        sx: {
          '& .MuiPickersToolbar-penIconButton': { display: 'none' }
        }
      }}
      value={handleLimitationConfig(value)}
      onChange={(date) => onChange(handleLimitationConfig(date))}
      renderInput={(params: MuiTextFieldPropsType) => (
        <TextField
          {...params}
          fullWidth
          sx={{
            svg: { color: theme.palette.primary.main }
          }}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setIsOpen(true)}
          data-cy={CypressIds.COMMON_TIME_PICKER}
          error={isError}
          helperText={errorMessage ?? ''}
        />
      )}
      {...otherProps}
    />
  );
};

export default TimePickerWrapper;
