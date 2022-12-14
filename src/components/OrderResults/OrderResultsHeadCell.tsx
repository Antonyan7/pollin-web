import React, { useCallback } from 'react';
import { OrderResultsSortFields } from '@axios/results/resultsManagerTypes';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell, SortOrder } from 'types/patient';

interface OrderResultsHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: OrderResultsSortFields) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: OrderResultsSortFields | null;
}

export const OrderResultsHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: OrderResultsHeadCellProps) => {
  const onSort = useCallback(
    (field: OrderResultsSortFields) => {
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
          onClick={() => onSort(headCell.id as OrderResultsSortFields)}
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
