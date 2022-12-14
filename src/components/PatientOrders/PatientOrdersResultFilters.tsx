import React from 'react';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

// ticket responsible for creating layout, next ticket will cover all.
const PatientOrdersResultFilters = () => {
  const [t] = useTranslation();

  return (
    <BaseDropdownWithLoading
      options={[]}
      isLoading={false}
      fullWidth
      renderInputProps={{
        label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)
      }}
    />
  );
};

export default PatientOrdersResultFilters;
