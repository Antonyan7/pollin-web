import React from 'react';
import { Checkbox, TableCell, TableRow, useTheme } from '@mui/material';
import { ITransportListFolderProps, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';

interface AllTestsRowProps {
  row: ITransportListFolderProps;
  actions: SpecimenActionsValues[];
  isItemSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => void;
  labelId: string;
}

export const TransportsListRow = ({ row, actions, isItemSelected, onClick, labelId }: AllTestsRowProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        padding="checkbox"
        onClick={(event) => {
          event.stopPropagation();
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
      <TableCell>{row.title}</TableCell>
      <TableCell>date</TableCell>
      <TableCell>{row.labName}</TableCell>
      <TableCell>{row.driver.name}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
