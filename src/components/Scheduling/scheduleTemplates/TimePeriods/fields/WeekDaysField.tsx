import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@mui/material';
import { weekDays } from 'helpers/constants';
import { ISingleTemplate, ITemplateGroup } from 'types/create-schedule';

interface IWeekdaysFieldProps {
  index: number;
  singleTemplate: ISingleTemplate;
}

const WeekDaysField = ({ index, singleTemplate }: IWeekdaysFieldProps) => {
  const { control } = useFormContext<ITemplateGroup>();
  const {
    field: { onChange, value }
  } = useController({ name: `timePeriods.${index}.days`, control });
  const onWeekDaysChange =
    (indexOfDay: number): CheckboxProps['onChange'] =>
    (e) =>
      onChange(e.target.checked ? [...value, indexOfDay] : value.filter((item) => item !== indexOfDay));

  return (
    <span className="week-days schedule-inputs schedule-days-checkbox">
      {weekDays.map((day, indexOfDay) => (
        <span key={day}>
          <Checkbox
            key={`${day}-${singleTemplate.id}`}
            onChange={onWeekDaysChange(indexOfDay)}
            checked={value.includes(indexOfDay)}
            sx={{
              color: (theme) => theme.palette.secondary.main
            }}
          />
          {day}
        </span>
      ))}
    </span>
  );
};

export default WeekDaysField;
