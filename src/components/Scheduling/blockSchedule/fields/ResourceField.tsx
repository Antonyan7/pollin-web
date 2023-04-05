import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CypressIds } from 'constants/cypressIds';

import SharedResourceField from '@ui-component/shared/Fields/SharedResourceField';

import { IFieldRowProps } from '../form/IFieldRowProps';

const ResourceField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const fieldCyId = CypressIds.PAGE_SCHEDULING_BLOCK_RESOURCE;

  return (
    <SharedResourceField
      fieldName={fieldName}
      fieldLabel={fieldLabel}
      popupIcon={<KeyboardArrowDownIcon color="primary" />}
      fieldCyId={fieldCyId}
    />
  );
};

export default ResourceField;
