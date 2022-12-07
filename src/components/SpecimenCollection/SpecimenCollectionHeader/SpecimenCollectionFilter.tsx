import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimenCollectionFilterOption } from '@axios/booking/managerBookingTypes';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector, bookingSlice } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const { setSelectedSpecimenAppointmentsFilters } = bookingSlice.actions;

const SpecimenCollectionFilter = () => {
  const [t] = useTranslation();
  const specimenAppointmentsFilters = useAppSelector(bookingSelector.specimenAppointmentsFilters);
  const isFiltersArrayLoading = useAppSelector(bookingSelector.isSpecimenAppointmentsFiltersArrayLoading);
  const selectedSpecimenAppointmentsFilters = useAppSelector(bookingSelector.selectedSpecimenAppointmentsFilters);

  useEffect(() => {
    if (specimenAppointmentsFilters === null) {
      dispatch(bookingMiddleware.getSpecimenAppointmentsFilters());
    }
  }, [specimenAppointmentsFilters]);

  const adaptedGroupedOptions = () =>
    (specimenAppointmentsFilters ?? []).flatMap(({ options, type }) => options.map((option) => ({ ...option, type })));

  const onSpecimenAppointmentsFiltersChange = (newSpecimenAppointmentsFilters: SpecimenCollectionFilterOption[]) => {
    dispatch(setSelectedSpecimenAppointmentsFilters(newSpecimenAppointmentsFilters));
  };

  return (
    <Box sx={{ width: '450px' }}>
      <BaseDropdownWithLoading
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_FILTERS}
        multiple
        fullWidth
        limitTags={3}
        isLoading={isFiltersArrayLoading}
        options={adaptedGroupedOptions()}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        getOptionDisabled={(option) => {
          if (option && selectedSpecimenAppointmentsFilters.length > 0) {
            return !!selectedSpecimenAppointmentsFilters.find((item) => item.type === option.type);
          }

          return false;
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={[...selectedSpecimenAppointmentsFilters]}
        onChange={(_event, newSpecimenAppointmentsFilters, reason) => {
          if (reason === 'clear') {
            onSpecimenAppointmentsFiltersChange([]);
          } else {
            onSpecimenAppointmentsFiltersChange(
              newSpecimenAppointmentsFilters.filter(
                (specimenAppointmentsFilter): specimenAppointmentsFilter is SpecimenCollectionFilterOption =>
                  typeof specimenAppointmentsFilter === 'object'
              )
            );
          }
        }}
        clearIcon={<CloseIcon fontSize="small" />}
        renderInputProps={{
          label: t(Translation.PAGE_SPECIMEN_COLLECTION_SELECT_FILTERS)
        }}
      />
    </Box>
  );
};

export default SpecimenCollectionFilter;
