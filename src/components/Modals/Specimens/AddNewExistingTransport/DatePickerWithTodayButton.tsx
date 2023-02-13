import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import { Grid, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';

import { futureDate180DaysAfter, getCurrentDate, getDate, neutralDateTime } from '@utils/dateUtils';

const CalendarPopupIcon = styled(CalendarTodayTwoTone)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const DatePickerWithTodayButton = () => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const theme = useTheme();
  const [t] = useTranslation();
  const currentDay = getCurrentDate();
  const isToday = getDate(calendarDate) === getDate(currentDay);

  const onTodayClick = useCallback(() => {
    dispatch(bookingMiddleware.setDateValue(getDate(getCurrentDate())));
  }, []);
  const onDateDatePickerOpen = useCallback(() => {
    setDatePickerOpen(true);
  }, []);
  const onDateDatePickerClose = useCallback(() => {
    setDatePickerOpen(false);
  }, []);
  const onDateChange = useCallback((date: Date | null) => {
    if (date) {
      dispatch(bookingMiddleware.setDateValue(format(date, 'yyyy-MM-dd')));
    }
  }, []);

  return (
    <Grid item container xs={12}>
      <Grid item xs={3}>
        <StyledButtonNew variant="outlined" onClick={onTodayClick} disabled={isToday}>
          <Typography sx={{ color: theme.palette.primary.main }} variant="h4">
            {t(Translation.PAGE_APPOINTMENTS_BUTTON_TODAY)}
          </Typography>
        </StyledButtonNew>
      </Grid>
      <Grid item xs={9}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={2}>
            <DesktopDatePicker
              disableMaskedInput
              maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
              open={datePickerOpen}
              onOpen={onDateDatePickerOpen}
              onClose={onDateDatePickerClose}
              label={t(
                Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_TRANSPORT_DATE
              )}
              inputFormat="MMM dd, yyyy"
              value={new Date(`${calendarDate}${neutralDateTime}`)}
              onChange={(date: Date | null) => onDateChange(date)}
              components={{
                OpenPickerIcon: CalendarPopupIcon
              }}
              renderInput={(params) => (
                <TextField
                  disabled
                  fullWidth
                  {...params}
                  onClick={() => setDatePickerOpen(true)}
                  onKeyDown={(event) => {
                    event.preventDefault();
                  }}
                />
              )}
            />
          </Stack>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default DatePickerWithTodayButton;
