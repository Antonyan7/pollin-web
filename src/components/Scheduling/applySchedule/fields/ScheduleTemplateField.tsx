import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, FormControl, TextField } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { SchedulingTemplateProps } from 'types/reduxTypes/scheduling';

interface Props {
  setScheduleTemplate: (value: React.SetStateAction<SchedulingTemplateProps>) => void;
  label: string;
}

const ScheduleTemplateField = ({ setScheduleTemplate, label }: Props) => {
  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);

  const handleSelectTemplate = (templateItem: SchedulingTemplateProps | null) => {
    if (templateItem) {
      dispatch(schedulingMiddleware.getSingleSchedule(templateItem.id));
      setScheduleTemplate(templateItem);
    }
  };

  return (
    <FormControl fullWidth>
      <Autocomplete
        popupIcon={<KeyboardArrowDownIcon />}
        options={scheduleTemplates.templates}
        onChange={(e, value: SchedulingTemplateProps | null) => {
          handleSelectTemplate(value);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(itemTemplate) => itemTemplate.name}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
};

export default ScheduleTemplateField;
