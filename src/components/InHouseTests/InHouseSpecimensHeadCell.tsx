import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { IHeadCell } from 'types/patient';

interface InHouseSpecimensHeadCellProps {
  headCell: IHeadCell;
}

export const InHouseSpecimensHeadCell = ({ headCell }: InHouseSpecimensHeadCellProps) => (
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
