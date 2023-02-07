import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput, styled, useTheme } from '@mui/material';
import { Box, shouldForwardProp } from '@mui/system';
import { Translation } from 'constants/translations';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import slice from 'redux/slices/patients/slice';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { IPatientsFilterOption } from 'types/patient';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

export const StyledOutlinedInput = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 500,
  height: 53,
  marginBottom: margins.bottom20,
  marginRight: margins.right20,
  paddingLeft: paddings.left16,
  paddingRight: paddings.right16,
  background: 'transparent',
  '& input': {
    background: 'transparent',
    paddingLeft: paddings.left4
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: margins.left4,
    background: theme.palette.common.white
  }
}));

interface PatientFiltersProps {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  setFiltersChange: React.Dispatch<SetStateAction<Omit<IPatientsFilterOption, 'title'>[]>>;
}

const PatientFilters = ({ setSearchValue, setFiltersChange }: PatientFiltersProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const [selectedFilterResults, setSelectedFilterResults] = useState<IPatientsFilterOption[]>([]);
  const { setPatientsLoadingState } = slice.actions;
  const patientFilters = useAppSelector(patientsSelector.filtersList);
  const isFiltersLoading = useAppSelector(patientsSelector.isPatientsFiltersLoading);
  const searchPlaceholder = t(Translation.PAGE_PATIENT_LIST_FIELD_SEARCH);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientSearchFilters());
  }, []);

  const adaptedPatientFilterOptions: IPatientsFilterOption[] = useMemo(
    () =>
      patientFilters.flatMap((patientFilter) =>
        patientFilter.options.map((option) => ({ ...option, type: patientFilter.type }))
      ),
    [patientFilters]
  );

  const onFilterUpdate = (filters: IPatientsFilterOption[]) => {
    const filtersWithoutTitle = filters.map((filter: Partial<IPatientsFilterOption>) => ({
      id: filter.id,
      type: filter.type
    }));

    setSelectedFilterResults(filters);
    setFiltersChange(filtersWithoutTitle as Omit<IPatientsFilterOption, 'title'>[]);
  };

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPatientsLoadingState(true));

      const debouncedCallback = debounce(() => setSearchValue(event.target.value), 1000);

      debouncedCallback();
    },
    [setSearchValue, setPatientsLoadingState]
  );

  return (
    <Box display="flex">
      <StyledOutlinedInput
        id="input-search-patients"
        placeholder={searchPlaceholder}
        onChange={onSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        }
      />
      <BaseDropdownWithLoading
        id="patientFilterId"
        fullWidth
        multiple
        disableClearable
        isLoading={isFiltersLoading}
        options={adaptedPatientFilterOptions}
        PopperComponent={GroupedServiceProvidersPopper}
        groupBy={(option) => option.type}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title : option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, filters) => onFilterUpdate(filters as IPatientsFilterOption[])}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        getOptionDisabled={(option) => {
          if (option && selectedFilterResults.length > 0) {
            return !!selectedFilterResults?.find((selectedFilterResult) => selectedFilterResult.type === option.type);
          }

          return false;
        }}
        renderInputProps={{
          label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)
        }}
      />
    </Box>
  );
};

export default PatientFilters;
