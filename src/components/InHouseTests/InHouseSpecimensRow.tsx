import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { ISpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';

interface InHouseSpecimensRowProps {
  row: ISpecimensListItem;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

export const InHouseSpecimensRow = ({ row, actions, onClick, isItemSelected, labelId }: InHouseSpecimensRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <TableRow hover role="checkbox" key={row.id}>
      <TableCell
        padding="checkbox"
        onClick={(event) => {
          onClick(event, row.id);
        }}
      >
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          key={row.id}
        />
      </TableCell>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.machine}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${t(Translation.PAGE_RESULTS_LIST_ITEM_DAYS)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell align="left">
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
