import React, { useCallback } from 'react';
import { TestResultsListSortFields } from '@axios/results/resultsManagerTypes';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell, SortOrder } from 'types/patient';

interface ExternalResultsHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: TestResultsListSortFields) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: TestResultsListSortFields | null;
}

export const PendingTestResultHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: ExternalResultsHeadCellProps) => {
  const onSort = useCallback(
    (field: TestResultsListSortFields) => {
      setSortField(field);
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    },
    [setSortField, setSortOrder, sortOrder]
  );

  return (
    <TableCell key={headCell.id} align={headCell.align}>
      {headCell.isSortable ? (
        <TableSortLabel
          direction={sortField === headCell.id ? (sortOrder as SortOrder) : SortOrder.Asc}
          active={sortField === headCell.id}
          sx={{
            paddingLeft: headCell.paddingLeft
          }}
          onClick={() => onSort(headCell.id as TestResultsListSortFields)}
        >
          {headCell.label}
        </TableSortLabel>
      ) : (
        <TableSortLabel
          hideSortIcon
          sx={{
            paddingLeft: headCell.paddingLeft
          }}
        >
          {headCell.label}
        </TableSortLabel>
      )}
    </TableCell>
  );
};
