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

  return preSelectedFilters?.length ? preSelectedFilters.map((filter) => filter) : [];
};
