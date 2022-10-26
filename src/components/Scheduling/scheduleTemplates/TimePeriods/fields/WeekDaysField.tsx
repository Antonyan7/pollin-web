import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Translation } from 'constants/translations';
import { weekDays } from 'helpers/constants';
import { ISingleTemplate, ITemplateGroup } from 'types/create-schedule';

interface IWeekdaysFieldProps {
  index: number;
  singleTemplate: ISingleTemplate;
}

const WeekDaysField = ({ index, singleTemplate }: IWeekdaysFieldProps) => {
  const [t] = useTranslation();
  const { control, formState, register } = useFormContext<ITemplateGroup>();
  const {
    errors: { timePeriods }
  } = formState;
  const weekDayError = timePeriods?.[index]?.days;
  const { field } = useController({ name: `timePeriods.${index}.days`, control });
  const { onChange, value } = field;
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SELECT_ERROR);
  const onWeekDaysChange =
    (indexOfDay: number): CheckboxProps['onChange'] =>
    (e) =>
      onChange(e.target.checked ? [...value, indexOfDay] : value.filter((item) => item !== indexOfDay));

  return (
    <span className="week-days schedule-inputs schedule-days-checkbox">
      <FormControl error={!!weekDayError}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {weekDays.map((day, indexOfDay) => (
            <FormControlLabel
              key={`${day}-${singleTemplate.id}`}
              label={day}
              value={indexOfDay}
              control={
                <Checkbox
                  {...register(field.name, { required: true })}
                  checked={value.includes(indexOfDay)}
                  onChange={onWeekDaysChange(indexOfDay)}
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
