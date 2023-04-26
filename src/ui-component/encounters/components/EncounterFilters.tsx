import React, { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IOptionsProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import { StyledOutlinedInput } from '@components/Patients/PatientFilters';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { BoxProps, InputAdornment, Typography, useTheme } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { IEncountersReqBody, IPatientsFilterOption } from 'types/patient';

import { useLodashThrottle } from '@hooks/useLodashThrottle';
import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';
import { maxEncountersSearchLength } from '@ui-component/encounters/helpers/initialValues';

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
  const encounterFilters = useAppSelector(patientsSelector.encounterFilters);
  const searchValue = useAppSelector(patientsSelector.encountersSearchValue);
  const [isSearchInputFocused, setSearchInputFocused] = useState(false);
  const selectedEncountersFilters = useAppSelector(patientsSelector.selectedEncountersFilters);
  const [selectedFilterResults, setSelectedFilterResults] = useState<IPatientsFilterOption[]>([]);
  const isEncountersFiltersLoading = useAppSelector(patientsSelector.isEncountersFiltersLoading);
  const isEncountersListLoading = useAppSelector(patientsSelector.isEncountersListLoading);
  const encountersList = useAppSelector(patientsSelector.encountersList);
  const searchFieldPlaceholder = t(Translation.PAGE_ENCOUNTERS_LIST_SEARCH);

  const handleThrottleSearch = useCallback((data: IEncountersReqBody) => {
    dispatch(patientsMiddleware.getEncounterList(data));
  }, []);

  const throttleFn = useLodashThrottle(handleThrottleSearch);

  useEffect(() => {
    const data: IEncountersReqBody = {
      patientId,
      ...(selectedEncountersFilters.length ? { filters: selectedEncountersFilters } : {}),
      ...(searchValue.length ? { searchString: searchValue } : {}),
      page: page + 1
    };

    if (patientId) {
      dispatch(patientsMiddleware.setEncountersLoadingState(true));
      throttleFn(data);
    }
  }, [page, patientId, selectedEncountersFilters, searchValue, throttleFn]);

  useEffect(() => {
    if (patientId) {
      dispatch(patientsMiddleware.getEncounterFilters(patientId));
    }
  }, [patientId]);

  const adaptedEncounterFilterOptions: IOptionsProps[] = useMemo(
    () =>
      encounterFilters?.flatMap((encounterFilter) =>
        encounterFilter.options.map((option) => ({
          ...option,
          type: encounterFilter.type,
          titleName: encounterFilter.title
        }))
      ) ?? [],
    [encounterFilters]
  );

  const handleSearchValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const encounterSearchValue = event.target.value;

    if (encounterSearchValue.length === maxEncountersSearchLength) {
      return;
    }

    dispatch(patientsMiddleware.setEncounterSearch(encounterSearchValue));
  }, []);

  const onAutoCompleteChange = useCallback((encounterFilterValues: IPatientsFilterOption[]) => {
    const filtersWithoutTitle = encounterFilterValues.map(({ id, type }: Partial<IPatientsFilterOption>) => ({
      id,
      type
    }));

    setSelectedFilterResults(encounterFilterValues);
    dispatch(patientsMiddleware.setSelectedEncounterFilters(filtersWithoutTitle as IPatientsFilterOption[]));
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
  const showClearIcon = searchValue.length && !isSearchInputFocused;

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
            showClearIcon ? (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{ color: theme.palette.primary.main, '&:hover': { cursor: 'pointer' } }}
                  onClick={clearSearchValue}
                />
              </InputAdornment>
            ) : null
          }
          data-cy={CypressIds.PAGE_PATIENT_ENCOUNTERS_SEARCH_INPUT}
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
        options={adaptedEncounterFilterOptions}
        PopperComponent={GroupedServiceProvidersPopper}
        groupBy={(option) => option.titleName as string}
        getOptionLabel={(option) => (typeof option === 'object' ? option.title ?? '' : option)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, filters) => onAutoCompleteChange(filters as IPatientsFilterOption[])}
        data-cy={CypressIds.PAGE_PATIENT_ENCOUNTERS_FILTER}
        popupIcon={<KeyboardArrowDownIcon sx={{ color: theme.palette.primary.main }} />}
        clearIcon={<CloseIcon onClick={() => onAutoCompleteChange([])} fontSize="small" />}
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
    </MainHeader>
  );
};

export default EncounterFilters;
