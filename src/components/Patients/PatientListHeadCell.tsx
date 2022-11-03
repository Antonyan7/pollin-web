import React, { useCallback } from 'react';
import { TableCell, TableSortLabel, Typography } from '@mui/material';
import { IHeadCell, PatientListField, SortOrder } from 'types/patient';

interface PatientListHeadCellProps {
  headCell: IHeadCell;
  setSortField: (value: PatientListField) => void;
  setSortOrder: (value: SortOrder) => void;
  sortOrder: SortOrder;
  sortField: PatientListField;
}

export const PatientListHeadCell = ({
  headCell,
  setSortField,
  setSortOrder,
  sortOrder,
  sortField
}: PatientListHeadCellProps) => {
  const onSort = useCallback(
    (field: PatientListField) => {
      setSortField(field);
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    },
    [setSortField, setSortOrder, sortOrder]
  );

  return (
    <TableCell key={headCell.id} align={headCell.align}>
      {headCell.isSortable ? (
        <TableSortLabel
          direction={sortField === headCell.id ? sortOrder : SortOrder.Asc}
          active={sortField === headCell.id}
          sx={{
            paddingLeft: headCell.paddingLeft
          }}
          onClick={() => onSort(headCell.id as PatientListField)}
        >
          <Typography fontWeight="bold">{headCell.label}</Typography>
        </TableSortLabel>
      ) : (
        <TableSortLabel
          hideSortIcon
          sx={{
            paddingLeft: headCell.paddingLeft
          }}
        >
          <Typography fontWeight="bold">{headCell.label}</Typography>
        </TableSortLabel>
      )}
    </TableCell>
  );
};
