/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { useRouter } from 'next/router';
import { SortOrder } from 'types/patient';
import { ISpecimensFilterOptions } from 'types/results';

import { InHouseSpecimensListState } from '../types';

const useInHouseSpecimensListCallbacks = (
  setInHouseSpecimensList: React.Dispatch<React.SetStateAction<InHouseSpecimensListState>>
) => {
  const router = useRouter();
  const updateInHouseSpecimenList = useCallback((newUpdates: Partial<InHouseSpecimensListState>) => {
    setInHouseSpecimensList((previousState) => ({
      ...previousState,
      ...newUpdates
    }));
  }, []);

  const handlePageChange = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      const url = {
        pathname: router.pathname,
        query: { ...router.query, selectedPage: newPage + 1 }
      };

      router.push(url, undefined, { shallow: true });

      updateInHouseSpecimenList({ page: newPage });
    },
    [router]
  );

  const searchByIdsHandler = useCallback(
    (searchedIds: string[]) => {
      const url = {
        pathname: router.pathname,
        query: { ...router.query, selectedSpecimens: searchedIds, selectedPage: 1 }
      };

      router.push(url, undefined, { shallow: true });

      updateInHouseSpecimenList({
        page: 0,
        searchedItems: searchedIds
      });
    },
    [router]
  );

  const filterChangeHandler = useCallback(
    (newFilters: ISpecimensFilterOptions[]) => {
      const filters = newFilters?.map(({ id }) => id);
      const url = {
        pathname: router.pathname,
        query: { ...router.query, selectedFilter: filters, selectedPage: 1 }
      };

      router.push(url, undefined, { shallow: true });

      updateInHouseSpecimenList({
        page: 0,
        selectedFilters: newFilters
      });
    },
    [router]
  );

  const handleSortOrderChange = useCallback((newSortOrder: SortOrder) => {
    updateInHouseSpecimenList({
      sortOrder: newSortOrder
    });
  }, []);

  const handleSortFieldChange = useCallback((newSortField: SpecimensListSortFields) => {
    updateInHouseSpecimenList({
      sortField: newSortField
    });
  }, []);

  return useMemo(
    () => ({
      updateInHouseSpecimenList,
      handleSortFieldChange,
      handleSortOrderChange,
      filterChangeHandler,
      searchByIdsHandler,
      handlePageChange
    }),
    [
      filterChangeHandler,
      handlePageChange,
      handleSortFieldChange,
      handleSortOrderChange,
      searchByIdsHandler,
      updateInHouseSpecimenList
    ]
  );
};

export default useInHouseSpecimensListCallbacks;
