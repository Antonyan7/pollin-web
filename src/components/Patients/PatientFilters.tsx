import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedByTitlesProps } from '@axios/managerPatientEmr';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, CircularProgress, InputAdornment, OutlinedInput, TextField, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, shouldForwardProp } from '@mui/system';
import { Translation } from 'constants/translations';
import { filterByUniqueCategory, reformattedFilterResults } from 'helpers/patientFilters';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { IPatientsFilterOption } from 'types/patient';

export const StyledOutlinedInput = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 500,
  height: 53,
  marginBottom: 20,
  marginRight: 20,
  paddingLeft: 16,
  paddingRight: 16,
  background: 'transparent',
  '& input': {
    background: 'transparent',
    paddingLeft: '4px'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
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
      <Autocomplete
        id="patientFilterId"
        fullWidth
        multiple
        loading={isFiltersLoading}
        loadingText={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress size={20} />
          </Box>
        }
        options={reformattedFilterResults(filtersList)}
        groupBy={(option) => option.options.type as string}
        getOptionLabel={(option) => option.options.title as string}
        isOptionEqualToValue={(option, value) => option.options.id === value.options.id}
        value={selectedFilterResults}
        onChange={(_, selectedOption: GroupedByTitlesProps[]) => {
          onAutoCompleteChange(selectedOption);
        }}
        popupIcon={<KeyboardArrowDownIcon />}
        renderInput={(params) => <TextField {...params} label={t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)} />}
      />
    </Box>
  );
};

export default PatientFilters;
