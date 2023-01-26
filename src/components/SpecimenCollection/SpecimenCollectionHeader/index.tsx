import React from 'react';
import { useTranslation } from 'react-i18next';
import SpecimenCollectionDatePicker from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionDatePicker';
import SpecimenCollectionFilter from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionFilter';
import { Stack } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import ResourceDropdown from '@ui-component/dropdown/ResourceDropdown';

const SpecimenCollectionHeader = () => {
  const [t] = useTranslation();
  const groupedServiceProvidersList = useAppSelector(bookingSelector.specimenGroupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.specimenServiceProviderId);
  const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isSpecimenGroupedServiceProvidersLoading);

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={1}>
      <ResourceDropdown
        groupedServiceProvidersList={groupedServiceProvidersList}
        serviceProviderId={serviceProviderId}
        isGroupedServiceProvidersLoading={isGroupedServiceProvidersLoading}
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
