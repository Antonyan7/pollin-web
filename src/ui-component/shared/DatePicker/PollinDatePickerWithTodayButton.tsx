import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import { Grid, Typography, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

interface DatePickerWithTodayButtonProps {
  calendarDate: Date;
  onChange: (value: Date | null) => void;
}

const PollinDatePickerWithTodayButton = ({ calendarDate, onChange }: DatePickerWithTodayButtonProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const cypressId = CypressIds.COMMON_BUTTON_TODAY;

  const isToday = useMemo(() => DateUtil.isSameDate(calendarDate), [calendarDate]);

  const onTodayClick = useCallback(() => {
    onChange(DateUtil.representInClinicDate());
  }, [onChange]);

  return (
    <Grid item columnGap={3} container xs={12}>
      <Grid item xs={3}>
        <StyledButtonNew data-cy={cypressId} variant="outlined" onClick={onTodayClick} disabled={isToday}>
          <Typography sx={{ color: theme.palette.primary.main }} variant="h4">
            {t(Translation.COMMON_BUTTON_TODAY)}
          </Typography>
        </StyledButtonNew>
      </Grid>
      <Grid item xs={8}>
        <PollinDatePicker type={PollinDatePickerType.Date} pickerConfigs={{ value: calendarDate, onChange }} />
      </Grid>
    </Grid>
  );
};

export default PollinDatePickerWithTodayButton;
