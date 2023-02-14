import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimenCollectionFilterOption } from '@axios/booking/managerBookingTypes';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Box, Chip, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector, bookingSlice } from '@redux/slices/booking';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borderRadius, borders, gridSpacing, margins, positionSpaces } from 'themes/themeConstants';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const { setSelectedSpecimenAppointmentsFilters } = bookingSlice.actions;

const useStyles = makeStyles({
  selectedValues: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'scroll',
    width: '100%',
    overflowY: 'auto',
    gap: gridSpacing,
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  selectedValue: {
    margin: `${margins.topBottom2} ${margins.leftRight0}`,
    fontWeight: 600
  }
});

const SpecimenCollectionFilter = () => {
  const [t] = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const specimenAppointmentsFilters = useAppSelector(bookingSelector.specimenAppointmentsFilters);
  const isFiltersArrayLoading = useAppSelector(bookingSelector.isSpecimenAppointmentsFiltersArrayLoading);
  const selectedSpecimenAppointmentsFilters = useAppSelector(bookingSelector.selectedSpecimenAppointmentsFilters);

  const onDropdownOpenClose = () => setDropdownOpen(!dropdownOpen);

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
    <Box>
      <BaseDropdownWithLoading
        data-cy={CypressIds.PAGE_SPECIMEN_COLLECTION_SELECT_FILTERS}
        multiple
        fullWidth
        disableClearable
        isLoading={isFiltersArrayLoading}
        open={dropdownOpen}
        onOpen={onDropdownOpenClose}
        onClose={onDropdownOpenClose}
        options={adaptedGroupedOptions()}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`,
            position: 'absolute',
            top: positionSpaces.top12,
            width: '100%',
            backgroundColor: theme.palette.common.white
          }
        }}
        sx={{
          '& .MuiAutocomplete-input': {
            display: selectedSpecimenAppointmentsFilters.length ? 'none' : 'flex'
          }
        }}
        renderTags={(specimenOptions, getSpecimenTagProps) => (
          <Box className={classes.selectedValues} onClick={onDropdownOpenClose}>
            {specimenOptions.map((specimentOption, optionIndex) => (
              <Chip
                deleteIcon={<HighlightOffTwoToneIcon />}
                label={specimentOption.title}
                {...getSpecimenTagProps({ index: optionIndex })}
                key={specimentOption.id}
                className={classes.selectedValue}
              />
            ))}
          </Box>
        )}
        PopperComponent={GroupedServiceProvidersPopper}
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
