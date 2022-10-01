import React, { useMemo } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, FormControl, TextField } from '@mui/material';
import { repeatWeeksList } from 'helpers/constants';
import { IApplyScheduleDay } from 'types/apply-schedule';

interface Props {
  setRepeatWeeks: (value: React.SetStateAction<IApplyScheduleDay>) => void;
  label: string;
  repeatWeeks: IApplyScheduleDay;
}

const RepeatsField = ({ setRepeatWeeks, label, repeatWeeks }: Props) => {
  const onRepeatWeeksUpdate = (repeatWeeksItem: IApplyScheduleDay | null) => {
    if (repeatWeeksItem) {
      setRepeatWeeks(repeatWeeksItem);
    }
  };

  const weeksList = useMemo(() => repeatWeeksList(24), []);

  return (
    <FormControl fullWidth>
      <Autocomplete
        inputValue={repeatWeeks.name}
        popupIcon={<KeyboardArrowDownIcon />}
        options={weeksList}
        onChange={(e, value) => {
          onRepeatWeeksUpdate(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(itemRepeat) => itemRepeat.name}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
};

export default RepeatsField;
