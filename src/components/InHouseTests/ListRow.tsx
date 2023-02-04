import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { getRowLabel } from 'helpers/getPatientRowLabel';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import useChipColor from '@hooks/useChipColor';
import ContextMenu from '@ui-component/contextMenu';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import Chip from '@ui-component/patient/Chip';

import { SpecimensListRowProps } from './types';

const SpecimensListRow = ({ row, actions, onClick, isItemSelected }: SpecimensListRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  const chipColor = useChipColor(row.age);

  return (
    <TableRow
      role="checkbox"
      hover
      key={row.id}
      {...(isItemSelected && {
        sx: {
          background: theme.palette.secondary[200]
        }
      })}
    >
      <TableCell padding="checkbox">
        <CustomCheckbox
          checkedIcon={<CheckedIcon />}
          checkedColor={theme.palette.primary.light}
          key={row.id}
          checked={isItemSelected}
          onChange={(event) => onClick(event, row.id)}
        />
      </TableCell>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.identifier}</TableCell>
      <TableCell>{row.machine}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ background: chipColor.light, color: chipColor.dark }}
          label={`${row.age}  ${getRowLabel(row.age, t)} `}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};

export default SpecimensListRow;
