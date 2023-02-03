import { createContext } from 'react';
import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { SortOrder } from 'types/patient';

import { SpecimensListContextValues } from '../types';

const SpecimensListContext = createContext<SpecimensListContextValues>({
  inHouseSpecimensList: {
    page: 0,
    searchedItems: [],
    sortField: SpecimensListSortFields.COLLECTION_AGE,
    sortOrder: SortOrder.Desc,
    selectedFilters: []
  },
  callbacks: {
    filterChangeHandler() {},
    handlePageChange() {},
    handleSortFieldChange() {},
    searchByIdsHandler() {},
    handleSortOrderChange() {},
    updateInHouseSpecimenList() {}
  }
});

export default SpecimensListContext;
