import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor, OrderResultAction } from 'types/results';

import Chip from '@ui-component/patient/Chip';

import ContextMenu from './ContextMenu';

interface OrderResultsRowProps {
  row: IOrderResultsByPatientItem;
  actions: OrderResultAction[];
}

export const OrderResultsRow = ({ row, actions }: OrderResultsRowProps) => (
  <TableRow role="checkbox" hover key={row.id}>
    <TableCell>{row.dateReported}</TableCell>
    <TableCell>{row.panelName}</TableCell>
    <TableCell>{row.measurement?.map((x) => `${x.title} ${x.unit}\n`)}</TableCell>
    <TableCell>{row.measurement?.map((x) => `${x.result}\n`)}</TableCell>
    <TableCell>{row.status}</TableCell>
    <TableCell>
      <Chip
        chipColor={FinalResultChipColor[row.finalResultType]}
        sx={{
          height: '33px'
        }}
        label={row.finalResultType}
      />
    </TableCell>
    <TableCell align="left" onClick={(e) => e.stopPropagation()}>
      <ContextMenu actions={actions} />
    </TableCell>
  </TableRow>
);
