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
import { getStatusTitle } from '@utils/mappings';

import { SpecimenListRowProps } from './types';

const SpecimenListRow = ({ row, actions, onClick, isItemSelected, index }: SpecimenListRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const actionVariations = useAppSelector(resultsSelector.specimenActions);

  const chipColors = useChipColor(row.age);
  const statusTitle = getStatusTitle(actionVariations, row.status);

  const actionBindings = useSpecimenActions([row], actions, index);

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
      <TableCell>{statusTitle}</TableCell>
      <TableCell align="center">
        <Chip
          sx={{ ...chipColors }}
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
