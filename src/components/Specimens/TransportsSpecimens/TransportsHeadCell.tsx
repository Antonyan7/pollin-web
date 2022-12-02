import React, { useCallback } from 'react';
import { TransportsSortFields } from '@axios/results/resultsManagerTypes';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell, SortOrder } from 'types/patient';

interface TransportsHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: TransportsSortFields) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: TransportsSortFields | null;
}

export const TransportsHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: TransportsHeadCellProps) => {
  const onSort = useCallback(
    (field: TransportsSortFields) => {
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
          onClick={() => onSort(headCell.id as TransportsSortFields)}
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
