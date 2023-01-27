import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { getRowLabel } from 'helpers/getPatientRowLabel';
import { useRouter } from 'next/router';
import { ISpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
import useChipColor from '@hooks/useChipColor';
import ContextMenu from '@ui-component/contextMenu';
import CustomCheckbox from '@ui-component/orders/OrderGroupCheckbox';
import Chip from '@ui-component/patient/Chip';

interface InHouseSpecimensRowProps {
  row: ISpecimensListItem;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const InHouseSpecimensRow = ({ row, actions, onClick, isItemSelected }: InHouseSpecimensRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const navigateToTestResultsPage = () => {
    const currentPath = router.asPath;
    const specimenId = row.id;
    const inHouseTestResultsPagePath = `${currentPath}/input-results/${specimenId}`;

    router.push(inHouseTestResultsPagePath);
  };

  const chipColor = useChipColor(row.age);

  return (
    <TableRow
      role="checkbox"
      hover
      key={row.id}
      onClick={navigateToTestResultsPage}
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
