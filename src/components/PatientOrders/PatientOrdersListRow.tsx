import React, { useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { ordersSelector } from '@redux/slices/orders';
import { IOrdersListItem } from 'types/reduxTypes/ordersStateTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

import useOrderActions from '@hooks/contextMenu/useOrderActions';
import { ContextMenu } from '@ui-component/contextMenu';
import Chip from '@ui-component/patient/Chip';
import { DateUtil } from '@utils/date/DateUtil';

interface PatientOrdersListRowProps {
  row: IOrdersListItem;
}

const PatientOrdersListRow = ({ row }: PatientOrdersListRowProps) => {
  const dateCreated = DateUtil.formatDateOnly(row.createdAt);
  const orderStatuses = useAppSelector(ordersSelector.orderStatuses);
  const currentOrderStatus = useMemo(
    () => orderStatuses.find((orderStatus) => orderStatus.status === row.status),
    [orderStatuses, row]
  );

  const chipBackgroundColor = currentOrderStatus?.label?.backgroundColor as string;
  const chipTextColor = currentOrderStatus?.label?.textColor as string;
  const contextMenuOptions = currentOrderStatus?.actions as ContextMenuAction[];

  const actionBindings = useOrderActions(row, contextMenuOptions);

  return (
    <TableRow sx={{ cursor: 'pointer' }} hover tabIndex={-1} key={row.id}>
      <TableCell width="25%">{dateCreated}</TableCell>
      <TableCell align="left" width="25%">
        {row.title}
      </TableCell>
      <TableCell align="left" width="25%">
        {row.orderTypes}
      </TableCell>
      <TableCell align="left">
        <Chip
          sx={{
            background: chipBackgroundColor,
            color: chipTextColor,
            ':hover': {
              color: chipTextColor,
              backgroundColor: chipBackgroundColor
            }
          }}
          label={currentOrderStatus?.title}
          chipColor="active"
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <ContextMenu actionBindings={actionBindings} />
      </TableCell>
    </TableRow>
  );
};

export default PatientOrdersListRow;
