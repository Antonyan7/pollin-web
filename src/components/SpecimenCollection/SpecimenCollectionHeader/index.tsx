import React from 'react';
import { useTranslation } from 'react-i18next';
import SpecimenCollectionDatePicker from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionDatePicker';
import SpecimenCollectionFilter from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionFilter';
import { Stack } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import ResourceDropdown from '@ui-component/dropdown/ResourceDropdown';

const SpecimenCollectionHeader = () => {
  const [t] = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
      <ResourceDropdown
        specimenCollection
        dataCy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE}
        label={t(Translation.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE)}
      />
      <SpecimenCollectionDatePicker />
      <SpecimenCollectionFilter />
    </Stack>
  );
};

export default SpecimenCollectionHeader;
