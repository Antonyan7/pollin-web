import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, TableRow, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { ISpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import { CheckedIcon } from '@assets/icons/CheckedIcon';
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
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
