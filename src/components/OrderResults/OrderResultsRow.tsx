import React from 'react';
import { Stack, TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { ordersSelector } from '@redux/slices/orders';
import { useRouter } from 'next/router';
import { IOrderResultsByPatientItem } from 'types/reduxTypes/ordersStateTypes';
import { FinalResultType } from 'types/reduxTypes/resultsStateTypes';
import { FinalResultChipColor, OrderResultAction } from 'types/results';

import useOrderResultsActions from '@hooks/contextMenu/useOrderResultsActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';
import { getStatusTitle } from '@utils/mappings';

import { margins } from '../../themes/themeConstants';

interface OrderResultsRowProps {
  row: IOrderResultsByPatientItem;
  actions: OrderResultAction[];
  rowIndex?: number;
}

export const OrderResultsRow = ({ row, actions, rowIndex }: OrderResultsRowProps) => {
  const router = useRouter();
  const actionVariations = useAppSelector(ordersSelector.orderResultsStatuses);
  const { id: patientId } = router.query;
  const handleOrderResultRowClick = () => {
    router.push(`/patient-emr/details/${patientId}/orders/results/${row.id}`);
  };

  const actionBindings = useOrderResultsActions(row, actions, rowIndex);

  // TODO: Will be updated after new timezone configuration
  const dateCompleted = DateUtil.formatDateOnly(row.dateCompleted);

  const statusTitle = getStatusTitle(actionVariations, row.status);

  return (
    <TableRow role="checkbox" hover key={row.id} onClick={handleOrderResultRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell>{dateCompleted}</TableCell>
      <TableCell>
        {row.panelName}
        <Stack alignItems="left" justifyContent="center" marginLeft={margins.left16}>
          {/* TODO Better logic for keys TEAMA-5504 */}
          {row.measurement?.length > 1 &&
            row.measurement.map((item, index) => (
              <span key={item.title?.concat('-', index.toString())}>{item.title}</span>
            ))}
        </Stack>
      </TableCell>
      <TableCell>
        {/* TODO Better logic for keys TEAMA-5504 */}
        {row.measurement?.map((measurement, index) => (
          <span key={measurement.title?.concat('-', index.toString())}>
            {measurement.unit}
            <br />
          </span>
        ))}
      </TableCell>
      <TableCell>
        {/* TODO Better logic for keys TEAMA-5504 */}
        {row.measurement?.map((measurement, index) => (
          <span key={measurement.result?.concat('-', index.toString())}>
            {measurement.result}
            <br />
          </span>
        ))}
      </TableCell>
      <TableCell>{statusTitle}</TableCell>
      <TableCell>
        <Chip
          chipColor={FinalResultChipColor[row.finalResultType]}
          sx={{
            p: 0,
            height: '28px'
          }}
          label={FinalResultType[row.finalResultType]}
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};
