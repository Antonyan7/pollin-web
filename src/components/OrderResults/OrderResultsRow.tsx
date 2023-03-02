import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns-tz';
import { useRouter } from 'next/router';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/ordersStateTypes';
import { FinalResultChipColor, OrderResultAction } from 'types/results';

import useOrderResultsActions from '@hooks/contextMenu/useOrderResultsActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { convertToLocale } from '@utils/dateUtils';

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

  const actionBindings = useOrderResultsActions(row, actions);

  // TODO: Will be updated after new timezone configuration
  const dateCompleted = format(new Date(convertToLocale(row.dateCompleted)), 'MMM dd, yyyy');

  return (
    <TableRow role="checkbox" hover key={row.id} onClick={handleOrderResultRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell>{dateCompleted}</TableCell>
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
            p: 0,
            height: '28px'
          }}
          label={row.finalResultType}
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};
