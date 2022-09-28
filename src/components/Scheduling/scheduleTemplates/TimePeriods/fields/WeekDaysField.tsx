import React from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';
import { ISingleTemplate } from 'types/create-schedule';

import { weekDays } from '../../../../../helpers/constants';

import { TimePeriodsFieldProps } from './TimePeriodsFieldProps';

interface IWeekdaysFieldProps extends TimePeriodsFieldProps {
  singleTemplate: ISingleTemplate;
}

const WeekDaysField = ({ index, singleTemplate, updateInputValue }: IWeekdaysFieldProps) => {
  const onWeekDaysChange =
    (indexOfDay: number): CheckboxProps['onChange'] =>
    (e) =>
      updateInputValue('days', e.target.checked, index, indexOfDay);

  return (
    <span className="week-days schedule-inputs schedule-days-checkbox">
      {weekDays.map((day, indexOfDay) => (
        <span key={day}>
          <Checkbox
            key={`${day}-${singleTemplate.id}`}
            onChange={onWeekDaysChange(indexOfDay)}
            color="secondary"
            checked={singleTemplate.days.includes(indexOfDay)}
          />
          {day}
        </span>
      ))}
    </span>
  );
};

export default WeekDaysField;
