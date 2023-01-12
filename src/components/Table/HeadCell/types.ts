import { IHeadCell, SortOrder } from 'types/patient';

export interface HeadCellProps<T> {
  headCell: IHeadCell;
  setSortField: (value: T) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: T | null;
}
