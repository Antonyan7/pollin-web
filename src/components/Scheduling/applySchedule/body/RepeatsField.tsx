import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import { AVAILABLE_REPEAT_WEEKS } from '../constants';
import useFieldControl from '../hooks/useFieldControl';
import { ApplyScheduleFields } from '../types';

const WeekRepeats = () => {
  const { field } = useFieldControl(ApplyScheduleFields.WEEKS_REPEAT_COUNT);

  const [t] = useTranslation();
  const repeatWeeksLabel = t(Translation.PAGE_SCHEDULING_APPLY_REPEATS);
  const repeatCyId = CypressIds.PAGE_SCHEDULING_APPLY_EVERY;

  const onRepeatWeeksUpdate = (repeatWeeksItem: string) => {
    if (repeatWeeksItem) {
      field.onChange(repeatWeeksItem);
    } else {
      field.onChange('');
    }
  };

  return (
    <ApplyScheduleFormRow title={repeatWeeksLabel}>
      <FormControl fullWidth>
        <BaseDropdownWithLoading
          isLoading={false}
          value={field.value}
          popupIcon={<KeyboardArrowDownIcon />}
          options={AVAILABLE_REPEAT_WEEKS}
          onChange={(_e, value) => {
            const isSelectedValueValid = value && typeof value === 'string';

            if (isSelectedValueValid) {
              onRepeatWeeksUpdate(value);
            }
          }}
          getOptionLabel={(weeksCount) => {
            if (!weeksCount) {
              return '';
            }

            const weeksLabel =
              weeksCount > 1 ? t(Translation.COMMON_WEEK_LABEL_MULTIPLE) : t(Translation.COMMON_WEEK_LABEL_SINGLE);

            return `${weeksCount} ${weeksLabel}`;
          }}
          clearIcon={<CloseIcon onClick={() => onRepeatWeeksUpdate('')} fontSize="small" />}
          renderInputProps={{ label: repeatWeeksLabel }}
          data-cy={repeatCyId}
        />
      </FormControl>
    </ApplyScheduleFormRow>
  );
};

export default WeekRepeats;
