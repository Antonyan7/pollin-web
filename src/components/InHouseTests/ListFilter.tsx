import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { GroupedServiceProvidersPopper } from '@components/common/MaterialComponents';
import { useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { borderRadius, borders } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { IResultsFilterOption } from 'types/results';

import BaseDropdownWithLoading from '@ui-component/BaseDropdownWithLoading';

import { findFilterById } from '../../helpers/inHouse';

import useSpecimensListContext from './hooks/useSpecimensListContext';

const SpecimenListFilter = () => {
  const theme = useTheme();
  const router = useRouter();
  const [t] = useTranslation();
  const filtersList = useAppSelector(resultsSelector.specimensFiltersList);
  const isFiltersLoading = useAppSelector(resultsSelector.isSpecimensFiltersLoading);
  const filterLabel = t(Translation.PAGE_IN_HOUSE_SPECIMENS_FILTER_LABEL);
  const { callbacks, inHouseSpecimensList } = useSpecimensListContext();
  const { filterChangeHandler, updateInHouseSpecimenList } = callbacks;
  const { selectedFilters } = inHouseSpecimensList;

  useEffect(() => {
    dispatch(resultsMiddleware.getSpecimensFilters());
  }, []);

  const adaptedGroupedOptions: IResultsFilterOption[] = useMemo(
    () =>
      filtersList?.flatMap((item) =>
        item.options.map((option: IResultsFilterOption) => ({ ...option, group: item.title, type: option.type }))
      ),
    [filtersList]
  );

  const onFilterUpdate = (filters: IResultsFilterOption[]) => {
    filterChangeHandler(filters);
  };

  useEffect(() => {
    const { selectedFilter, selectedPage, selectedSortField, selectedSortOrder, selectedSpecimens } = router.query;
    let specimens = selectedSpecimens && selectedSpecimens.length ? selectedSpecimens : ([] as string | string[]);

    specimens = !Array.isArray(specimens) ? [specimens] : (specimens as string[]);

    if (filtersList.length) {
      updateInHouseSpecimenList({
        page: selectedPage ? Number(selectedPage) - 1 : 0,
        sortField: selectedSortField
          ? (selectedSortField as SpecimensListSortFields)
          : SpecimensListSortFields.COLLECTION_AGE,
        sortOrder: selectedSortOrder ? (selectedSortOrder as SortOrder) : SortOrder.Desc,
        searchedItems: specimens?.length ? (specimens as string[]).map((specimen) => specimen) : [],
        selectedFilters: findFilterById(filtersList, selectedFilter)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList]);

  return (
    <BaseDropdownWithLoading
      fullWidth
      multiple
      isLoading={isFiltersLoading}
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
      renderInputProps={{ label: filterLabel }}
      PopperComponent={GroupedServiceProvidersPopper}
    />
  );
};

export default SpecimenListFilter;
