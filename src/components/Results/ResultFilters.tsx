import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  InputAdornment,
  OutlinedInput,
  styled,
  TextField,
  TextFieldProps,
  useTheme
} from '@mui/material';
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
  setPage: (page: number) => void;
}

const ResultFilters = ({ setSearchValue, setFiltersChange, setPage }: ResultFiltersProps) => {
  const theme = useTheme();
  const [t] = useTranslation();
  const resultsFilterLabel = t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS);
  const filtersList = useAppSelector(resultsSelector.resultsFiltersList);
  const isFiltersLoading = useAppSelector(resultsSelector.isResultsFiltersLoading);
  const [selectedFilters, setSelectedFilters] = useState<IResultsFilterOption[]>([]);

  const filterPlaceholder = t(Translation.PAGE_RESULTS_LIST_FIELD_SEARCH);

  const adaptedGroupedOptions = useMemo(
    () =>
      (filtersList ?? []).flatMap((item) =>
        item.options.map((option: IResultsFilterOption) => ({ ...option, group: item.title, type: option.type }))
      ),
    [filtersList]
  );

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const debouncedCallback = debounce(() => setSearchValue(event.target.value), 1000);

      debouncedCallback();
      setPage(0);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchValue]
  );

  const onFilterUpdate = (filters: IResultsFilterOption[]) => {
    setPage(0);
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
            return !!selectedFilters?.find((item) => item.group === option.group);
          }

          return false;
        }}
        options={adaptedGroupedOptions}
        groupBy={(option) => option.group}
        getOptionLabel={(option) => option.title}
        PopperComponent={GroupedServiceProvidersPopper}
        renderInput={(params: TextFieldProps) => (
          <TextField {...params} label={resultsFilterLabel} name="resultsFilter" />
        )}
      />
    </Box>
  );
};

export default ResultFilters;
