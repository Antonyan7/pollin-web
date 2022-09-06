import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell } from 'types/patient';

interface PatientListHeadCellProps {
  headCell: IHeadCell;
}

export const PatientListHeadCell = ({ headCell }: PatientListHeadCellProps) => (
  <TableCell key={headCell.id} align={headCell.align}>
    {headCell.label ? (
      <TableSortLabel
        sx={{
          paddingLeft: headCell.paddingLeft
        }}
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
