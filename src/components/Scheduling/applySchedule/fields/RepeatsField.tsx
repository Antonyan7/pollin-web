import React, { useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
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
  dataCy?: string;
}

const RepeatsField = ({ setRepeatWeeks, label, repeatWeeks, dataCy }: Props) => {
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
        dataCy={dataCy}
        isLoading={false}
        inputValue={repeatWeeks.name}
        popupIcon={<KeyboardArrowDownIcon />}
        options={weeksList}
        onChange={(e, value) => {
          if (value && typeof value === 'object') {
            onRepeatWeeksUpdate(value as IApplyScheduleDay);
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(itemRepeat) => (typeof itemRepeat === 'object' ? itemRepeat.name : itemRepeat)}
        clearIcon={<CloseIcon onClick={() => onRepeatWeeksUpdate(null)} fontSize="small" />}
        renderInputProps={{ label }}
      />
    </FormControl>
  );
};

export default RepeatsField;
