import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedByTitlesProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { BoxProps, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box, styled } from '@mui/system';
import { Translation } from 'constants/translations';
import { filterByUniqueCategory, reformattedFilterResults } from 'helpers/patientFilters';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { IEncountersFilterOption, IEncountersReqBody } from 'types/patient';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

const MainHeader = styled(Box)<BoxProps>(() => ({
  marginTop: margins.top16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const EncounterFilters = ({ page }: { page: number }) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const patientId = useAppSelector(patientsSelector.currentPatientId);
  const encounterFilters = useAppSelector(patientsSelector.encounterFilters) ?? [];
  const [searchValue, setSearchValue] = useState<string>('');
  const [clearSearchInput, setClearSearchInput] = useState<boolean>(false);
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

  const handleDebounceSearch = useCallback(
    (inputValue: string) => {
      const data: IEncountersReqBody = {
        patientId
      };

      if (inputValue) {
        data.searchString = inputValue;
      }

      dispatch(patientsMiddleware.getEncounterList(data));
    },
    [patientId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceSearch, 1000), [handleDebounceSearch]);

  const handleSearchValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (clearSearchInput) {
        setSearchValue('');
      } else {
        setSearchValue(event.target.value);
        debounceFn(event.target.value);
      }
    },
    [debounceFn, setSearchValue, clearSearchInput]
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

  const clearSearchValue = useCallback(() => {
    setSearchValue('');
    setClearSearchInput(true);
  }, []);

  return (
    <MainHeader>
      <StyledOutlinedInput
        onChange={handleSearchValueChange}
        id="input-search-encounters"
        value={searchValue}
        placeholder={`${t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH)}`}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <HighlightOffTwoToneIcon
              sx={{ color: theme.palette.primary.main, '&:hover': { cursor: 'pointer' } }}
              onClick={clearSearchValue}
            />
          </InputAdornment>
        }
      />
      <BaseDropdownWithLoading
        id="encounterFilterId"
        fullWidth
        multiple
        isLoading={isEncountersFiltersLoading}
        options={reformattedFilterResults(encounterFilters as [])}
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
    </MainHeader>
  );
};

export default EncounterFilters;
