import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell } from 'types/patient';

interface AllTestsHeadCellProps {
  headCell: IHeadCell;
}

export const AllTestsHeadCell = ({ headCell }: AllTestsHeadCellProps) => (
  <TableCell key={headCell.id} align={headCell.align}>
    <TableSortLabel
      hideSortIcon
      sx={{
        paddingLeft: headCell.paddingLeft
      }}
    >
      {headCell.label}
    </TableSortLabel>
  </TableCell>
);
