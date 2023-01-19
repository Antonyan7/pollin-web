import React, { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedByTitlesProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { BoxProps, InputAdornment, Typography, useTheme } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Translation } from 'constants/translations';
import { filterByUniqueCategory, reformattedFilterResults } from 'helpers/patientFilters';
import throttle from 'lodash.throttle';
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
  const searchValue = useAppSelector(patientsSelector.encountersSearchValue);
  const [isSearchInputFocused, setSearchInputFocused] = useState(false);
  const selectedEncountersFilters = useAppSelector(patientsSelector.selectedEncountersFilters);
  const [selectedFilterResults, setSelectedFilterResults] = useState<GroupedByTitlesProps[]>([]);
  const isEncountersFiltersLoading = useAppSelector(patientsSelector.isEncountersFiltersLoading);
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const encountersList = useAppSelector(patientsSelector.encountersList);

  const searchFieldPlaceholder = t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH);

  const handleThrottleSearch = useCallback((data: IEncountersReqBody) => {
    dispatch(patientsMiddleware.getEncounterList(data));
  }, []);

  const throttleFn = useMemo(
    () =>
      throttle(handleThrottleSearch, 1000, {
        leading: false,
        trailing: true
      }),
    [handleThrottleSearch]
  );

  useEffect(
    () => () => {
      throttleFn.cancel();
    },
    [throttleFn]
  );

  useEffect(() => {
    const data: IEncountersReqBody = {
      patientId,
      ...(selectedEncountersFilters.length ? { filters: selectedEncountersFilters } : {}),
      ...(searchValue.length ? { searchString: searchValue } : {}),
      ...(page ? { page } : {})
    };

    if (patientId) {
      dispatch(patientsMiddleware.setEncountersLoadingState(true));
      throttleFn(data);
    }
  }, [page, patientId, selectedEncountersFilters, searchValue, throttleFn]);

  useEffect(() => {
    dispatch(patientsMiddleware.getEncounterFilters());
  }, []);

  const handleSearchValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(patientsMiddleware.setEncounterSearch(event.target.value));
  }, []);

  const onAutoCompleteChange = useCallback((value: GroupedByTitlesProps[]) => {
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
    dispatch(patientsMiddleware.setSelectedEncounterFilters(filteredResultOptions));
  }, []);

  const clearSearchValue = useCallback(() => {
    dispatch(patientsMiddleware.setEncounterSearch(''));
  }, []);

  const onKeyDownEvent = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      (event.target as HTMLElement).blur();
    }
  };
  const showSearchValueResult = !isEncountersListLoading && (searchValue.length || selectedEncountersFilters.length);

  return (
    <MainHeader>
      <Box>
        <StyledOutlinedInput
          onBlur={() => setSearchInputFocused(false)}
          onFocus={() => setSearchInputFocused(true)}
          onKeyDown={onKeyDownEvent}
          onChange={handleSearchValueChange}
          id="input-search-encounters"
          value={searchValue}
          placeholder={searchFieldPlaceholder}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.primary.main }} />
            </InputAdornment>
          }
          endAdornment={
            searchValue.length && !isSearchInputFocused ? (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{ color: theme.palette.primary.main, '&:hover': { cursor: 'pointer' } }}
                  onClick={clearSearchValue}
                />
              </InputAdornment>
            ) : null
          }
        />
        {showSearchValueResult ? (
          <Typography
            sx={{
              marginLeft: margins.left16
            }}
          >
            {encountersList.encounters.length} {t(Translation.PAGE_PATIENT_ENCOUNTERS_LIST_RESULTS)}
          </Typography>
        ) : null}
      </Box>
      <BaseDropdownWithLoading
        id="encounterFilterId"
        fullWidth
        multiple
        isLoading={isEncountersFiltersLoading}
        options={reformattedFilterResults(encounterFilters as [])}
        groupBy={(option) => option.options.type as string}
        getOptionLabel={(option) => (typeof option === 'object' ? option.options.title ?? '' : option)}
        isOptionEqualToValue={(option, value) => option.options.id === value.options.id}
        value={[...selectedFilterResults]}
        onChange={(_, selectedOption) => {
          onAutoCompleteChange(
            selectedOption.filter((option): option is GroupedByTitlesProps => typeof option === 'object')
          );
        }}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        clearIcon={<CloseIcon onClick={() => onAutoCompleteChange([])} fontSize="small" />}
        renderInputProps={{
          label: t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS)
        }}
      />
    </MainHeader>
  );
};

export default EncounterFilters;
