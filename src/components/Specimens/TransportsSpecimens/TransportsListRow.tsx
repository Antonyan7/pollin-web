import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ITransportListFolderProps, SpecimenActionsValues } from 'types/reduxTypes/resultsStateTypes';

import ContextMenu from '@ui-component/contextMenu';

interface AllTestsRowProps {
  row: ITransportListFolderProps;
  actions: SpecimenActionsValues[];
}

export const TransportsListRow = ({ row, actions }: AllTestsRowProps) => (
  <TableRow>
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
