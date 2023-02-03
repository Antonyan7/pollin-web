import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { SortOrder } from 'types/patient';
import { ISpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';
import { ISpecimensFilterOptions } from 'types/results';

export interface InHouseSpecimensListState {
  page: number;
  searchedItems: string[];
  sortField: SpecimensListSortFields | null;
  sortOrder: SortOrder | null;
  selectedFilters: ISpecimensFilterOptions[];
}

export interface InHouseSpecimensListCallbacks {
  updateInHouseSpecimenList: (newUpdates: Partial<InHouseSpecimensListState>) => void;
  handleSortFieldChange: (newSortField: SpecimensListSortFields) => void;
  handleSortOrderChange: (newSortOrder: SortOrder) => void;
  filterChangeHandler: (newFilters: ISpecimensFilterOptions[]) => void;
  searchByIdsHandler: (values: string[]) => void;
  handlePageChange: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
}

export interface SpecimensListContextValues {
  callbacks: InHouseSpecimensListCallbacks;
  inHouseSpecimensList: InHouseSpecimensListState;
}

export interface SpecimensListRowProps {
  row: ISpecimensListItem;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}
