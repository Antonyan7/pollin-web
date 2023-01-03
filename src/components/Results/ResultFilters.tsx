import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment, OutlinedInput, TextField, TextFieldProps, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, shouldForwardProp } from '@mui/system';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { borderRadius, borders, margins, paddings } from 'themes/themeConstants';
import { IResultsFilterOption } from 'types/results';

const StyledOutlinedInputResultsFilter = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 700,
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

interface ResultFiltersProps {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  setFiltersChange: (args: IResultsFilterOption[]) => void;
}

const ResultFilters = ({ setSearchValue, setFiltersChange }: ResultFiltersProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const resultsFilterLabel = t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS);
  const filtersList = useAppSelector(resultsSelector.resultsFiltersList);
  const isFiltersLoading = useAppSelector(resultsSelector.isResultsFiltersLoading);
  const [selectedFilters, setSelectedFilters] = useState<IResultsFilterOption[]>([]);

  const filterPlaceholder = t(Translation.PAGE_RESULTS_LIST_FIELD_SEARCH);

  const adaptedGroupedOptions = () =>
    (filtersList?.options.map((option: IResultsFilterOption) => ({
      ...option,
      type: option.type
    })) as IResultsFilterOption[]) ?? [];

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const debouncedCallback = debounce(() => setSearchValue(event.target.value), 1000);

      debouncedCallback();
    },
    [setSearchValue]
  );

  const onFilterUpdate = (filters: IResultsFilterOption[]) => {
    setSelectedFilters(filters);
    setFiltersChange(filters);
  };

  useEffect(() => {
    dispatch(resultsMiddleware.getResultsFilters());
  }, []);

  return (
    <Box display="flex">
      <StyledOutlinedInputResultsFilter
        id="input-search-patients"
        placeholder={filterPlaceholder}
        onChange={onSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        }
      />
      <Autocomplete
        fullWidth
        multiple
        loading={isFiltersLoading}
        ListboxProps={{
          style: {
            maxHeight: 260,
            borderRadius: `${borderRadius.radius8}`,
            border: `${borders.solid2px} ${theme.palette.primary.main}`
          }
        }}
        onChange={(event, filters) => onFilterUpdate(filters)}
        getOptionDisabled={(option) => {
          if (option && selectedFilters?.length > 0) {
            return !!selectedFilters?.find((item: { type: string }) => item.type === option.type);
          }

          return false;
        }}
        options={filtersList ? adaptedGroupedOptions() : []}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.title}
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} label={resultsFilterLabel} name="resultsFilter" />
        )}
      />
    </Box>
  );
};

export default ResultFilters;
