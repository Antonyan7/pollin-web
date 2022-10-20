import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedByTitlesProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translation } from 'constants/translations';
import { filterByUniqueCategory, reformattedFilterResults } from 'helpers/patientFilters';
import debounce from 'lodash.debounce';
import { MainHeader } from 'pages/booking/appointments';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { IEncountersFilterOption, IEncountersReqBody } from 'types/patient';
import { IFilterCategory } from 'types/reduxTypes/patient-emrStateTypes';

const EncounterFilters = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const encounterFilters = useAppSelector(patientsSelector.encounterFilters) ?? [];
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<IEncountersFilterOption[]>([]);
  const [selectedFilterResults, setSelectedFilterResults] = useState<GroupedByTitlesProps[]>([]);
  const isEncountersFiltersLoading = useAppSelector(patientsSelector.isEncountersFiltersLoading);

  useEffect(() => {
    const data: IEncountersReqBody = {
      patientId
    };

    if (filters.length) {
      data.filters = filters;
    }

    if (searchValue.length) {
      data.searchString = searchValue;
    }

    if (page) {
      data.page = page + 1;
    }

    if (patientId) {
      dispatch(patientsMiddleware.getEncounterList(data));
    }
  }, [page, patientId, filters, searchValue]);

  useEffect(() => {
    dispatch(patientsMiddleware.getEncounterFilters());
  }, []);

  const onSearchStringChange = useCallback(
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

      const filteredResultOptions: IEncountersFilterOption[] = [];

      filteredResult.forEach((titleProps: GroupedByTitlesProps) => {
        const filterOption = {
          type: titleProps.options.type,
          id: titleProps.options.id
        };

        filteredResultOptions.push(filterOption);
      });
      setFilters(filteredResultOptions);
    },
    [setFilters]
  );

  return (
    <MainHeader>
      <StyledOutlinedInput
        onChange={onSearchStringChange}
        id="input-search-encounters"
        placeholder={`${t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH)}`}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        }
      />
      <Autocomplete
        id="encounterFilterId"
        fullWidth
        multiple
        loading={isEncountersFiltersLoading}
        loadingText={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress size={20} />
          </Box>
        }
        options={reformattedFilterResults(encounterFilters as unknown as IFilterCategory[])}
        groupBy={(option) => option.options.type as string}
        getOptionLabel={(option) => option.options.title as string}
        isOptionEqualToValue={(option, value) => option.options.id === value.options.id}
        value={selectedFilterResults}
        onChange={(_, selectedOption: GroupedByTitlesProps[]) => {
          onAutoCompleteChange(selectedOption);
        }}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        renderInput={(params) => <TextField {...params} label={t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)} />}
      />
    </MainHeader>
  );
};

export default EncounterFilters;
