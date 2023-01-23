import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { borderRadius, borders } from 'themes/themeConstants';
import { IResultsFilterCategory } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { findFilterById } from '../../helpers/inHouse';

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

  const adaptedGroupedOptions = () =>
    filtersList?.flatMap((item) =>
      item.options.map((option: IResultsFilterOption) => ({ ...option, type: option.type }))
    );

  const onFilterUpdate = (filters: IResultsFilterOption[]) => {
    setSelectedFilters(filters);
    onChange(filters);
  };

  useEffect(() => {
    const { selectedFilter } = router.query;
    const previousFilters = findFilterById(filtersList, selectedFilter);

    setSelectedFilters(previousFilters);
    onChange(previousFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList]);

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
          return !!selectedFilters?.find((item: { type: string }) => item.type === option.type);
        }

        return false;
      }}
      options={filtersList.length ? adaptedGroupedOptions() : []}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => (typeof option === 'object' ? option.title ?? '' : option)}
      renderInputProps={{ label }}
    />
  );
};

export default AutocompleteWrapper;
