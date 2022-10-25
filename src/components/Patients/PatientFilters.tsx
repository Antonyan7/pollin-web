import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedByTitlesProps } from '@axios/patientEmr/managerPatientEmrTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, shouldForwardProp } from '@mui/system';
import { Translation } from 'constants/translations';
import { filterByUniqueCategory, reformattedFilterResults } from 'helpers/patientFilters';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins, paddings } from 'themes/themeConstants';
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
  setFiltersChange: React.Dispatch<SetStateAction<IPatientsFilterOption[]>>;
}

const PatientFilters = ({ setSearchValue, setFiltersChange }: PatientFiltersProps) => {
  const theme = useTheme();
  const [selectedFilterResults, setSelectedFilterResults] = useState<GroupedByTitlesProps[]>([]);
  const filtersList = useAppSelector(patientsSelector.filtersList);
  const isFiltersLoading = useAppSelector(patientsSelector.isPatientsFiltersLoading);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientSearchFilters());
  }, []);

  const { t } = useTranslation();

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const debouncedCallback = debounce(() => setSearchValue(event.target.value), 1000);

      debouncedCallback();
    },
    [setSearchValue]
  );

  const onAutoCompleteChange = useCallback(
    (value: GroupedByTitlesProps[]) => {
      const filteredResult = filterByUniqueCategory(value);

      setSelectedFilterResults(filteredResult);

      const filteredResultOptions: IPatientsFilterOption[] = [];

      filteredResult.forEach((titleProps: GroupedByTitlesProps) => {
        const filterOption = {
          type: titleProps.options.type,
          id: titleProps.options.id
        };

        filteredResultOptions.push(filterOption);
      });
      setFiltersChange(filteredResultOptions);
    },
    [setFiltersChange]
  );

  return (
    <Box display="flex">
      <StyledOutlinedInput
        id="input-search-patients"
        placeholder={t(Translation.PAGE_PATIENT_LIST_FIELD_SEARCH)}
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
        isLoading={isFiltersLoading}
        options={reformattedFilterResults(filtersList)}
        groupBy={(option) => option.options.type as string}
        getOptionLabel={(option) => option.options.title as string}
        isOptionEqualToValue={(option, value) => option.options.id === value.options.id}
        value={selectedFilterResults}
        onChange={(_, selectedOption: GroupedByTitlesProps[]) => {
          onAutoCompleteChange(selectedOption);
        }}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        renderInputProps={{
          label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)
        }}
      />
    </Box>
  );
};

export default PatientFilters;
