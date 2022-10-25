import React, { useMemo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl } from '@mui/material';
import { repeatWeeksList } from 'helpers/constants';
import { IApplyScheduleDay } from 'types/apply-schedule';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { defaultRepeatWeeks } from '../defaultValues';

interface Props {
  setRepeatWeeks: (value: React.SetStateAction<IApplyScheduleDay>) => void;
  label: string;
  repeatWeeks: IApplyScheduleDay;
}

const RepeatsField = ({ setRepeatWeeks, label, repeatWeeks }: Props) => {
  const onRepeatWeeksUpdate = (repeatWeeksItem: IApplyScheduleDay | null) => {
    if (repeatWeeksItem) {
      setRepeatWeeks(repeatWeeksItem);
    } else {
      setRepeatWeeks({ ...defaultRepeatWeeks });
    }
  };

  const weeksList = useMemo(() => repeatWeeksList(24), []);

  return (
    <FormControl fullWidth>
      <BaseDropdownWithLoading
        isLoading={false}
        inputValue={repeatWeeks.name}
        popupIcon={<KeyboardArrowDownIcon />}
        options={weeksList}
        onChange={(e, value) => {
          onRepeatWeeksUpdate(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(itemRepeat) => itemRepeat.name}
        renderInputProps={{ label }}
      />
    </FormControl>
  );
};

export default RepeatsField;
