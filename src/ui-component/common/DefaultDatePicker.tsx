import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { margins } from 'themes/themeConstants';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { futureDate180DaysAfter, getCurrentDate, getDate, neutralDateTime } from '@utils/dateUtils';

const DefaultDatePicker = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const currentDay = getCurrentDate();
  const onDateDatePickerOpen = () => {
    setDatePickerOpen(true);
  };

  const onDateDatePickerClose = () => {
    setDatePickerOpen(false);
  };

  const onDateChange = (date: Date | null) => {
    if (date) {
      dispatch(bookingMiddleware.setDateValue(format(date, 'yyyy-MM-dd')));
    }
  };

  const onTodayClick = () => {
    dispatch(bookingMiddleware.setDateValue(getDate(getCurrentDate())));
  };

  const isToday = getDate(calendarDate) === getDate(currentDay);

  return (
    <Stack direction="row" justifyContent="space-between" gap={margins.all16}>
      <StyledButtonNew
        variant="outlined"
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_BUTTON_TODAY}
        onClick={onTodayClick}
        disabled={isToday}
      >
        <Typography sx={{ color: theme.palette.primary.main }} variant="h4">
          {t(Translation.PAGE_SPECIMEN_COLLECTION_BUTTON_TODAY)}
        </Typography>
      </StyledButtonNew>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          PopperProps={{
            placement: 'bottom-start'
          }}
          data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_DESKTOP_DATE_PICKER}
          disableMaskedInput
          maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
          open={datePickerOpen}
          onOpen={onDateDatePickerOpen}
          onClose={onDateDatePickerClose}
          label={t(Translation.PAGE_SPECIMEN_COLLECTION_DESKTOP_DATE_PICKER)}
          inputFormat="MMM dd, yyyy"
          value={new Date(`${calendarDate}${neutralDateTime}`)}
          onChange={(date: Date | null) => onDateChange(date)}
          components={{
            OpenPickerIcon: CalendarIcon
          }}
          renderInput={(params) => (
            <TextField
              disabled
              sx={{ width: '320px' }}
              {...params}
              onClick={() => setDatePickerOpen(true)}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default DefaultDatePicker;
