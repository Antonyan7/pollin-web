import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { weekDays } from 'helpers/constants';
import { calculateWeekByNumber } from 'helpers/scheduling';
import { ITemplateGroup } from 'types/create-schedule';

interface IWeekdaysFieldProps {
  index: number;
}

const WeekDaysField = ({ index }: IWeekdaysFieldProps) => {
  const [t] = useTranslation();
  const { control, formState, getValues } = useFormContext<ITemplateGroup>();
  const {
    errors: { timePeriods }
  } = formState;
  const weekDayError = timePeriods?.[index]?.days;
  const { field } = useController({ name: `timePeriods.${index}.days`, control });

  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT_ERROR);
  const values = getValues().timePeriods[index]?.days.map((item) => Number(item));
  const weekDayCheckboxCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS;

  const onWeekDaysChange =
    (indexOfDay: number): CheckboxProps['onChange'] =>
    (e) =>
      field.onChange(
        e.target.checked
          ? [...values, indexOfDay]
          : values.map((item) => Number(item)).filter((item) => item !== indexOfDay)
      );

  const isChecked = (indexOfDay: number) => values.includes(calculateWeekByNumber(indexOfDay));

  return (
    <span className="week-days schedule-inputs schedule-days-checkbox">
      <FormControl error={!!weekDayError}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {weekDays.map((day, indexOfDay: number) => (
            <FormControlLabel
              key={day}
              label={day}
              value={calculateWeekByNumber(indexOfDay)}
              control={
                <Checkbox
                  data-cy={`${weekDayCheckboxCyId}-${indexOfDay}`}
                  value={field.value[indexOfDay]}
                  checked={isChecked(indexOfDay)}
                  onChange={onWeekDaysChange(calculateWeekByNumber(indexOfDay))}
                />
              }
              sx={{
                color: (theme) => theme.palette.primary.main
              }}
            />
          ))}
        </Box>
        {weekDayError?.message && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </span>
  );
};

export default WeekDaysField;
