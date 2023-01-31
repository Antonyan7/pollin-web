import React from 'react';
import { useTranslation } from 'react-i18next';
import SpecimenCollectionDatePicker from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionDatePicker';
import SpecimenCollectionFilter from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionFilter';
import { Grid } from '@mui/material';
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
    <Grid container direction="row" justifyContent="space-between" spacing={1}>
      <Grid item xs={12} sm={3}>
        <ResourceDropdown
          groupedServiceProvidersList={groupedServiceProvidersList}
          serviceProviderId={serviceProviderId}
          isGroupedServiceProvidersLoading={isGroupedServiceProvidersLoading}
          specimenCollection
          dataCy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE}
          label={t(Translation.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE)}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <SpecimenCollectionDatePicker />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SpecimenCollectionFilter />
      </Grid>
    </Grid>
  );
};

export default SpecimenCollectionHeader;
