import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import { SchedulingTemplateProps } from 'types/reduxTypes/schedulingStateTypes';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import { defaultScheduleTemplate } from '../constants/defaultValues';
import useFieldControl from '../hooks/useFieldControl';
import { ApplyScheduleFields } from '../types';

const ScheduleTemplateField = () => {
  const { field } = useFieldControl(ApplyScheduleFields.SCHEDULE_TEMPLATE);

  const [t] = useTranslation();
  const scheduleTemplateCyId = CypressIds.PAGE_SCHEDULING_APPLY_TEMPLATE;
  const scheduleLabel = t(Translation.PAGE_SCHEDULING_APPLY_TEMPLATE);

  const scheduleTemplates = useAppSelector(schedulingSelector.scheduleTemplates);
  const isScheduleTemplatesLoading = useAppSelector(schedulingSelector.scheduleListLoadingStatus);
  const [scheduleTemplateRequestCurrentPage, setScheduleTemplateRequestCurrentPage] = useState<number>(2);

  const handleSelectTemplate = (templateItem: SchedulingTemplateProps | null) => {
    if (templateItem) {
      dispatch(schedulingMiddleware.getSingleSchedule(templateItem.id));
      field.onChange(templateItem);
    } else {
      field.onChange({ ...defaultScheduleTemplate });
    }
  };

  const onScheduleTemplateScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const eventTarget = event.target as HTMLUListElement;

    const isScrollBottom = eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight;
    const areAvailableSchedulePages =
      scheduleTemplates.pageSize * scheduleTemplateRequestCurrentPage <= scheduleTemplates.totalItems;

    const shouldFetchNewSchedulingOptions = isScrollBottom && areAvailableSchedulePages;

    if (shouldFetchNewSchedulingOptions) {
      setScheduleTemplateRequestCurrentPage(scheduleTemplateRequestCurrentPage + 1);
      dispatch(schedulingMiddleware.getNewSchedulingTemplates(scheduleTemplateRequestCurrentPage));
    }
  };

  return (
    <ApplyScheduleFormRow title={scheduleLabel}>
      <FormControl fullWidth>
        <BaseDropdownWithLoading
          isLoading={isScheduleTemplatesLoading}
          value={field.value}
          data-cy={scheduleTemplateCyId}
          popupIcon={<KeyboardArrowDownIcon color="primary" />}
          options={scheduleTemplates?.templates}
          onChange={(e, value) => {
            const isSelectedValueValid = value && typeof value === 'object' && 'id' in value;

            if (isSelectedValueValid) {
              handleSelectTemplate(value);
            }
          }}
          ListboxProps={{
            style: {
              maxHeight: 220
            },
            onScroll: (event) => onScheduleTemplateScroll(event)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(itemTemplate) => (typeof itemTemplate === 'object' ? itemTemplate.name : itemTemplate)}
          clearIcon={<CloseIcon onClick={() => handleSelectTemplate(null)} fontSize="small" />}
          renderInputProps={{
            label: scheduleLabel
          }}
        />
      </FormControl>
    </ApplyScheduleFormRow>
  );
};

export default ScheduleTemplateField;
