import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { defaultScheduleTemplate } from '../defaultValues';

interface Props {
  setScheduleTemplate: (value: React.SetStateAction<SchedulingTemplateProps>) => void;
  label: string;
  scheduleTemplate: SchedulingTemplateProps;
}

const ScheduleTemplateField = ({ setScheduleTemplate, label, scheduleTemplate }: Props) => {
  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);
  const isScheduleTemplatesLoading = useAppSelector(schedulingSelector.scheduleListLoadingStatus);
  const [scheduleTemplateRequestCurrentPage, setScheduleTemplateRequestCurrentPage] = useState<number>(2);

  const handleSelectTemplate = (templateItem: SchedulingTemplateProps | null) => {
    if (templateItem) {
      dispatch(schedulingMiddleware.getSingleSchedule(templateItem.id));
      setScheduleTemplate(templateItem);
    } else {
      setScheduleTemplate({ ...defaultScheduleTemplate });
    }
  };

  const onScheduleTemplateScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const eventTarget = event.target as HTMLUListElement;

    const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
    const areAvailableSchedulePages =
      scheduleTemplates.pageSize * scheduleTemplateRequestCurrentPage <= scheduleTemplates.totalItems;

    if (isScrollBottom && areAvailableSchedulePages) {
      setScheduleTemplateRequestCurrentPage(scheduleTemplateRequestCurrentPage + 1);
      dispatch(schedulingMiddleware.getNewSchedulingTemplates(scheduleTemplateRequestCurrentPage));
    }
  };

  return (
    <FormControl fullWidth>
      <BaseDropdownWithLoading
        isLoading={isScheduleTemplatesLoading}
        inputValue={scheduleTemplate.name}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        options={scheduleTemplates.templates}
        onChange={(e, value: SchedulingTemplateProps | null) => {
          handleSelectTemplate(value);
        }}
        ListboxProps={{
          style: {
            maxHeight: 220
          },
          onScroll: (event) => onScheduleTemplateScroll(event)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(itemTemplate) => itemTemplate.name}
        renderInputProps={{
          label
        }}
      />
    </FormControl>
  );
};

export default ScheduleTemplateField;
