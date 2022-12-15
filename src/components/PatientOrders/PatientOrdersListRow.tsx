import React, { useMemo } from 'react';
import { IOrdersPossibleActions } from '@axios/results/resultsManagerTypes';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { IOrdersListItem } from 'types/reduxTypes/resultsStateTypes';

import Chip from '@ui-component/patient/Chip';

import PatientOrdersContextMenu from './PatientOrdersContextMenu';

interface PatientOrdersListRowProps {
  row: IOrdersListItem;
}

const PatientOrdersListRow = ({ row }: PatientOrdersListRowProps) => {
  const dateCreated = timeAdjuster(row.createdAt).customizedDate;
  const orderStatuses = useAppSelector(resultsSelector.orderStatuses);
  const currentOrderStatus = useMemo(
    () => orderStatuses.find((orderStatus) => orderStatus.status === row.status),
    [orderStatuses, row]
  );
  const chipBackgroundColor = currentOrderStatus?.backgroundColor as string;
  const chipTextColor = currentOrderStatus?.textColor as string;
  const contextMenuOptions = currentOrderStatus?.possibleActions as IOrdersPossibleActions[];

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
          label={row.status}
          chipColor="active"
        />
      </TableCell>
      <TableCell align="left" onClick={(e) => e.stopPropagation()}>
        <PatientOrdersContextMenu actions={contextMenuOptions} row={row} />
      </TableCell>
    </TableRow>
  );
};

export default PatientOrdersListRow;
