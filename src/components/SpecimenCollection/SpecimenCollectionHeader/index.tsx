import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
import SpecimenCollectionFilter from '@components/SpecimenCollection/SpecimenCollectionHeader/SpecimenCollectionFilter';
import { Grid } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import ResourceDropdown from '@ui-component/dropdown/ResourceDropdown';
import PollinDatePickerWithTodayButton from '@ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';

const SpecimenCollectionHeader = () => {
  const [t] = useTranslation();
  const groupedServiceProvidersList = useAppSelector(bookingSelector.specimenGroupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.specimenServiceProviderId);
  const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isSpecimenGroupedServiceProvidersLoading);
  const calendarDate = useAppSelector(bookingSelector.specimenCollectionCalendarDate);

  const onDateChange = useCallback((date?: Date | null) => {
    if (date) {
      dispatch(bookingMiddleware.updateCollectionCalendarDate(date));
    }
  }, []);

  const onServiceProviderChange = useCallback((providerOption?: GroupedServiceProvidersOption) => {
    dispatch(bookingMiddleware.updateSpecimenResourceId(providerOption?.id ?? ''));
  }, []);

  return (
    <Grid container direction="row" justifyContent="space-between" spacing={1}>
      <Grid item xs={12} sm={3}>
        <ResourceDropdown
          groupedServiceProvidersList={groupedServiceProvidersList}
          serviceProviderId={serviceProviderId}
          isLoading={isGroupedServiceProvidersLoading}
          isSpecimenCollection
          dataCy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE}
          label={t(Translation.PAGE_SPECIMEN_COLLECTION_SELECT_RESOURCE)}
          onChange={onServiceProviderChange}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <PollinDatePickerWithTodayButton calendarDate={calendarDate} onChange={onDateChange} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SpecimenCollectionFilter />
      </Grid>
    </Grid>
  );
};

export default SpecimenCollectionHeader;
