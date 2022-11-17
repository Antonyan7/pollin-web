import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Translation } from 'constants/translations';
import { weekDays } from 'helpers/constants';
import { calculateWeekByNumber } from 'helpers/scheduling';
import { ISingleTemplate, ITemplateGroup } from 'types/create-schedule';

interface IWeekdaysFieldProps {
  index: number;
  singleTemplate: ISingleTemplate;
}

const WeekDaysField = ({ index, singleTemplate }: IWeekdaysFieldProps) => {
  const [t] = useTranslation();
  const { control, formState, register, getValues } = useFormContext<ITemplateGroup>();
  const {
    errors: { timePeriods }
  } = formState;
  const weekDayError = timePeriods?.[index]?.days;
  const { field } = useController({ name: `timePeriods.${index}.days`, control });
  const { onChange } = field;
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT_ERROR);
  const values = getValues().timePeriods[index]?.days.map((item) => Number(item));

  const onWeekDaysChange =
    (indexOfDay: number): CheckboxProps['onChange'] =>
    (e) =>
      onChange(
        e.target.checked
          ? [...values, indexOfDay]
          : values.map((item) => Number(item)).filter((item) => item !== indexOfDay)
      );

  const isChecked = (indexOfDay: number) => values.includes(calculateWeekByNumber(indexOfDay));

  return (
    <span className="week-days schedule-inputs schedule-days-checkbox">
      <FormControl error={!!weekDayError}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {weekDays.map((day, indexOfDay) => (
            <FormControlLabel
              key={`${day}-${singleTemplate.id}`}
              label={day}
              value={calculateWeekByNumber(indexOfDay)}
              control={
                <Checkbox
                  {...register(field.name, { required: true })}
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
