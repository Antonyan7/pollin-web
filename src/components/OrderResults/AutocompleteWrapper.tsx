import React, { useState } from 'react';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import { useTheme } from '@mui/material';
import { borderRadius, borders } from 'themes/themeConstants';
import { IOrderResultsFilterCategory } from 'types/reduxTypes/ordersStateTypes';
import { IOrderResultsFilterOptions } from 'types/results';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

interface AutocompleteWrapperProps {
  onChange: (args: IOrderResultsFilterOptions[]) => void;
  label?: string;
  filtersList: IOrderResultsFilterCategory[];
  loading: boolean;
}

const AutocompleteWrapper = ({ onChange, label, filtersList, loading }: AutocompleteWrapperProps) => {
  const theme = useTheme();
  const [selectedFilters, setSelectedFilters] = useState<IOrderResultsFilterOptions[]>([]);

  const adaptedGroupedOptions = () =>
    filtersList?.flatMap((item) =>
      item.options.map((option: IOrderResultsFilterOptions) => ({ ...option, type: option.type }))
    );

  const onFilterUpdate = (filters: IOrderResultsFilterOptions[]) => {
    setSelectedFilters(filters);
    onChange(filters);
  };

  return (
    <BaseDropdownWithLoading
      PopperComponent={GroupedServiceProvidersPopper}
      fullWidth
      multiple
      isLoading={loading}
      ListboxProps={{
        style: {
          maxHeight: 260,
          borderRadius: `${borderRadius.radius8}`,
          border: `${borders.solid2px} ${theme.palette.primary.main}`
        }
      }}
      onChange={(event, filters) => onFilterUpdate(filters as IOrderResultsFilterOptions[])}
      getOptionDisabled={(option) => {
        if (option && selectedFilters.length > 0) {
          return !!selectedFilters?.find((item: { type: string }) => item.type === option.type);
        }

        return false;
      }}
      options={filtersList.length ? adaptedGroupedOptions() : []}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => (typeof option === 'object' ? option.title ?? '' : option)}
      renderInputProps={{ label }}
    />
  );
};

export default AutocompleteWrapper;
