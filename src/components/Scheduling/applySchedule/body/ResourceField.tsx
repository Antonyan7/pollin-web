import React from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import SharedResourceField from '@ui-component/shared/Fields/SharedResourceField';

import ApplyScheduleFormRow from '../common/ApplyScheduleFormRow';
import { ApplyScheduleFields } from '../types';

const ResourceField = () => {
  const [t] = useTranslation();
  const fieldName = ApplyScheduleFields.RESOURCE;
  const fieldLabel = t(Translation.PAGE_SCHEDULING_APPLY_RESOURCE);
  const fieldCyId = CypressIds.PAGE_SCHEDULING_APPLY_RESOURCE;

  return (
    <ApplyScheduleFormRow title={fieldLabel}>
      <SharedResourceField
        fieldName={fieldName}
        fieldLabel={fieldLabel}
        popupIcon={<KeyboardArrowDownIcon color="primary" />}
        fieldCyId={fieldCyId}
      />
    </ApplyScheduleFormRow>
  );
};

export default ResourceField;
