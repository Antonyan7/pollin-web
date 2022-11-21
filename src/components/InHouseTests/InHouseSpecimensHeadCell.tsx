import React, { useCallback } from 'react';
import { SpecimensListSortFields } from '@axios/results/resultsManagerTypes';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell, SortOrder } from 'types/patient';

interface InHouseSpecimensHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: SpecimensListSortFields) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder | null;
  sortField: SpecimensListSortFields | null;
}

export const InHouseSpecimensHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: InHouseSpecimensHeadCellProps) => {
  const onSort = useCallback(
    (field: SpecimensListSortFields) => {
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
          onClick={() => onSort(headCell.id as SpecimensListSortFields)}
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
