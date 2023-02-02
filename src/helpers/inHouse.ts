import { ISpecimensFilterCategory } from 'types/reduxTypes/resultsStateTypes';
import { IResultsFilterOption } from 'types/results';

export const findFilterById = (filtersList: ISpecimensFilterCategory[], selectedFilter?: string | string[]) => {
  const preSelectedFilters: IResultsFilterOption[] = [];

  filtersList?.forEach((item) => {
    const filterOptions = item.options.find((option) =>
      typeof selectedFilter === 'string' ? option.id === selectedFilter : selectedFilter?.includes(option.id)
    );

    if (filterOptions) {
      preSelectedFilters.push(filterOptions);
    }
  });

  return preSelectedFilters?.length ? preSelectedFilters : [];
};

export const findFilterOptionById = (
  filtersList: IResultsFilterOption[],
  selectedFilter?: string | string[]
): IResultsFilterOption[] => {
  if (selectedFilter && filtersList.length) {
    const selectedFilters = !Array.isArray(selectedFilter) ? [selectedFilter] : selectedFilter;

    const preSelectedFilters = selectedFilters?.map(
      (item) => filtersList.find((option) => option.id === item) as IResultsFilterOption
    );

    return preSelectedFilters ?? [];
  }

  return [];
};
