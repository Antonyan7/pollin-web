import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { getRowLabel } from 'helpers/getPatientRowLabel';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import useSpecimenActions from '@hooks/contextMenu/useSpecimenActions';
import useChipColor from '@hooks/useChipColor';
import { ContextMenu } from '@ui-component/contextMenu';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import Chip from '@ui-component/patient/Chip';

import { SpecimenListRowProps } from './types';

const SpecimenListRow = ({ row, actions, onClick, isItemSelected }: SpecimenListRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const specimenActions = useAppSelector(resultsSelector.specimenActions);
  const statusVariation = specimenActions.find((action) => action.status === row.status);

  const chipColor = useChipColor(row.age);

  const actionBindings = useSpecimenActions([row], actions);

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
      <TableCell>{statusVariation?.title}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ background: chipColor.light, color: chipColor.dark }}
          label={`${row.age}  ${getRowLabel(row.age, t)} `}
          size="small"
          chipColor="notActive"
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};

export default SpecimenListRow;
