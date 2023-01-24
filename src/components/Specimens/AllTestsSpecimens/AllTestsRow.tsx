import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { getRowLabel } from 'helpers/getPatientRowLabel';
import { IAllTestsSpecimensListItem, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';

interface AllTestsRowProps {
  row: IAllTestsSpecimensListItem;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  labelId: string;
}

export const AllTestsRow = ({ row, actions, isItemSelected, onClick, labelId }: AllTestsRowProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  return (
    <TableRow role="checkbox" hover key={row.id}>
      <TableCell padding="checkbox">
        <Checkbox
          sx={{ color: theme.palette.primary.main }}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId
          }}
          onChange={(event) => {
            event.stopPropagation();
            onClick(event, row.id);
          }}
          key={row.id}
        />
      </TableCell>
      <TableCell>{row.titles?.join(', ')}</TableCell>
      <TableCell>{row.identifier}</TableCell>
      <TableCell>{row.labName}</TableCell>
      <TableCell align="center">
        <Chip label={`${row.age} ${getRowLabel(row.age, t)}`} size="small" chipColor="notActive" />
      </TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
