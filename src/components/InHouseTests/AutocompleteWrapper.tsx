import React, { useEffect, useMemo, useState } from 'react';
import { GroupedServiceProvidersPopper } from '@components/Appointments/CommonMaterialComponents';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { borderRadius, borders } from 'themes/themeConstants';
import { IResultsFilterCategory } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { findFilterOptionById } from '../../helpers/inHouse';

interface AutocompleteWrapperProps {
  onChange: (args: IResultsFilterOption[]) => void;
  label?: string;
  filtersList: IResultsFilterCategory[];
  loading: boolean;
}

const AutocompleteWrapper = ({ onChange, label, filtersList, loading }: AutocompleteWrapperProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<IResultsFilterOption[]>([]);

  const adaptedGroupedOptions: IResultsFilterOption[] = useMemo(
    () =>
      filtersList?.flatMap((item) =>
        item.options.map((option: IResultsFilterOption) => ({ ...option, group: item.title, type: option.type }))
      ),
    [filtersList]
  );

  const onFilterUpdate = (filters: IResultsFilterOption[]) => {
    setSelectedFilters(filters);
    onChange(filters);
  };

  useEffect(() => {
    const { selectedFilter } = router.query;
    const previousFilters = findFilterOptionById(adaptedGroupedOptions, selectedFilter);

    setSelectedFilters(previousFilters);
    onChange(previousFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adaptedGroupedOptions]);

  return (
    <BaseDropdownWithLoading
      fullWidth
      multiple
      isLoading={loading}
      value={selectedFilters}
      ListboxProps={{
        style: {
          maxHeight: 260,
          borderRadius: `${borderRadius.radius8}`,
          border: `${borders.solid2px} ${theme.palette.primary.main}`
        }
      }}
      onChange={(event, filters) => onFilterUpdate(filters as IResultsFilterOption[])}
      getOptionDisabled={(option) => {
        if (option && selectedFilters.length > 0) {
          return !!selectedFilters?.find((item: IResultsFilterOption) => item.group === option.group);
        }

        return false;
      }}
      options={filtersList.length ? adaptedGroupedOptions : []}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => (typeof option === 'object' ? option.title ?? '' : option)}
      renderInputProps={{ label }}
      PopperComponent={GroupedServiceProvidersPopper}
    />
  );
};

export default AutocompleteWrapper;
