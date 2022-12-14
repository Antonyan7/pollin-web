import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { IOrderResultsFilterOptions } from 'types/results';

import AutocompleteWrapper from './AutocompleteWrapper';

const OrderResults = () => {
  const [, setSelectedFilters] = React.useState<IOrderResultsFilterOptions[]>([]);
  const filtersList = useAppSelector(resultsSelector.orderResultsFilters);
  const isFiltersLoading = useAppSelector(resultsSelector.isOrderResultsFiltersLoading);
  const [t] = useTranslation();
  const filterLabel = t(Translation.PAGE_PATIENT_LIST_FIELD_FILTERS);

  useEffect(() => {
    dispatch(resultsMiddleware.getOrderResultsFilters());
  }, []);

  const filterChangeHandler = useCallback((curFilters: IOrderResultsFilterOptions[]) => {
    setSelectedFilters(curFilters);
  }, []);

  return (
    <AutocompleteWrapper
      onChange={filterChangeHandler}
      label={filterLabel}
      filtersList={filtersList}
      loading={isFiltersLoading}
    />
  );
};

export default OrderResults;
