import React, { useCallback } from 'react';
import { OrderListSortFields } from '@axios/results/resultsManagerTypes';
import { OrdersTableProps } from '@components/PatientOrders/PatientOrdersTable';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell, SortOrder } from 'types/patient';

interface PatientOrdersListHeadCellProps extends OrdersTableProps {
  headCell: IHeadCell;
}

export const PatientOrdersListHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: PatientOrdersListHeadCellProps) => {
  const onSort = useCallback(
    (field: OrderListSortFields) => {
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
          onClick={() => onSort(headCell.id as OrderListSortFields)}
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
