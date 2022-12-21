import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor, OrderResultAction } from 'types/results';

import Chip from '@ui-component/patient/Chip';

import ContextMenu from './ContextMenu';

interface OrderResultsRowProps {
  row: IOrderResultsByPatientItem;
  actions: OrderResultAction[];
}

export const OrderResultsRow = ({ row, actions }: OrderResultsRowProps) => {
  const router = useRouter();
  const { id: patientId } = router.query;
  const handleOrderResultRowClick = () => {
    router.push(`/patient-emr/details/${patientId}/orders/results/${row.id}`);
  };

  return (
    <TableRow role="checkbox" hover key={row.id} onClick={handleOrderResultRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell>{row.dateReported}</TableCell>
      <TableCell>{row.panelName}</TableCell>
      <TableCell>
        {row.measurement?.map((measurement, index) => (
          <span key={measurement.title.concat('-', index.toString())}>
            {`${measurement.title} ${measurement.unit}`}
            <br />
          </span>
        ))}
      </TableCell>
      <TableCell>
        {row.measurement?.map((measurement, index) => (
          <span key={measurement.result.concat('-', index.toString())}>
            {measurement.result}
            <br />
          </span>
        ))}
      </TableCell>
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
        <ContextMenu actions={actions} row={row} />
      </TableCell>
    </TableRow>
  );
};
