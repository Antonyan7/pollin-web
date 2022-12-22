import React, { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, Grid, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { Translation } from 'constants/translations';
import { weekDays } from 'helpers/constants';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import { getApplyDaysToDisplay, getUniqueTimePeriodsApplyDates } from '../helpers';
import useFieldControl from '../hooks/useFieldControl';
import { ApplyScheduleFields } from '../types';

const SelectedWeekdaysForSchedule = () => {
  const scheduleApplyTemplates = useAppSelector(schedulingSelector.scheduleSingleTemplate);

  const theme = useTheme();
  const [t] = useTranslation();
  const { field } = useFieldControl(ApplyScheduleFields.SELECTED_WEEKDAYS_TO_APPLY);
  const { control } = useFormContext();

  const [scheduleTemplate, appliedDays] = useWatch({
    name: [ApplyScheduleFields.SCHEDULE_TEMPLATE, ApplyScheduleFields.SELECTED_WEEKDAYS_TO_APPLY],
    control
  });
  const { onChange, value } = field;
  const applyDaysListRendering = useMemo(() => {
    const uniqueTimePeriodsApplyDates = getUniqueTimePeriodsApplyDates(scheduleApplyTemplates);

    return getApplyDaysToDisplay(uniqueTimePeriodsApplyDates) as number[];
  }, [scheduleApplyTemplates]);

  useEffect(() => {
    // To discuss with team about this functional, now it's written like previous version for avoiding to break default worked logic.
    onChange(applyDaysListRendering);
  }, [applyDaysListRendering, onChange]);

  const onApplyDays = (isChecked: boolean, day: number) => {
    if (isChecked && !value.includes(day)) {
      onChange([...value, day]);
    } else {
      const newAppliedDays = value?.filter((appliedDay: number) => appliedDay !== day);

      onChange(newAppliedDays);
    }
  };

  const appliedDaysLabel = t(Translation.PAGE_SCHEDULING_APPLY_APPLIED_DAYS);
  const areThereVisibleWeekdays = applyDaysListRendering.length > 0 && scheduleTemplate?.id;

  return (
    <ApplyScheduleFormRow title={appliedDaysLabel} isHidden={!areThereVisibleWeekdays}>
      <Grid container spacing={2}>
        {applyDaysListRendering.map((day) => (
          <Grid item key={weekDays[day]}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={appliedDays.includes(day)}
                  style={{
                    color: theme.palette.grey[800]
                  }}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 26 } }}
                  onChange={(e) => {
                    const isDayChecked = e.target.checked;

                    onApplyDays(isDayChecked, day);
                  }}
                />
              }
              label={weekDays[day]}
            />
          </Grid>
        ))}
      </Grid>
    </ApplyScheduleFormRow>
  );
};

export default SelectedWeekdaysForSchedule;
